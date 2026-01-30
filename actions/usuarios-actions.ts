'use server'

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from "next/cache";

// Cliente ADMIN (Solo para uso en el servidor, nunca en el cliente)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, 
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// --- CREAR DOCENTE ---
export async function crearDocente(formData: FormData, colegioId: string) {
  const nombres = formData.get('nombres') as string;
  const apellidos = formData.get('apellidos') as string;
  const dni = formData.get('dni') as string;
  const email = formData.get('email') as string;
  // Contraseña por defecto (Ej: DNI) o generada
  const password = formData.get('password') as string || dni; 

  // 1. Crear usuario en AUTH (Sistema de Login)
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Confirmamos automáticamente
    user_metadata: { role: 'docente' }
  });

  if (authError) return { success: false, message: `Error Auth: ${authError.message}` };
  if (!authUser.user) return { success: false, message: 'No se pudo crear el usuario' };

  // 2. Crear perfil en tabla PERFILES (Para el control de roles global)
  const { error: perfilError } = await supabaseAdmin
    .from('perfiles')
    .insert({
      id: authUser.user.id, // Vinculamos ID
      nombre: nombres,
      apellido: apellidos,
      rol: 'docente',
      colegio_id: colegioId
    });

  if (perfilError) {
    // Si falla, deberíamos borrar el usuario de Auth para no dejar basura (Rollback manual)
    await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
    return { success: false, message: `Error Perfil: ${perfilError.message}` };
  }

  // 3. Crear datos específicos en tabla DOCENTES
  const { error: docenteError } = await supabaseAdmin
    .from('docentes')
    .insert({
      id: authUser.user.id, // Mismo ID
      colegio_id: colegioId,
      nombres,
      apellidos,
      dni,
      // especialidad, telefono, etc...
    });

  if (docenteError) {
     return { success: false, message: `Error Datos Docente: ${docenteError.message}` };
  }

  revalidatePath('/[domain]/admin/docentes', 'page');
  return { success: true };
}

// --- CREAR ALUMNO ---
export async function crearAlumno(formData: FormData, colegioId: string) {
    // ... Lógica similar a docente pero insertando en tabla 'alumnos' y 'matriculas'
    // ...
}