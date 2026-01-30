'use server'

import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

// --- TIPO DE RESPUESTA ESTÁNDAR ---
type ActionResponse = {
  success: boolean;
  message: string;
};

// 1. CREAR DOCENTE (Login + Perfil + Tabla Docentes)
export async function crearDocente(formData: FormData, colegioId: string): Promise<ActionResponse> {
  const email = formData.get('email') as string;
  const password = formData.get('dni') as string; // Usamos DNI como pass inicial
  const nombres = formData.get('nombres') as string;
  const apellidos = formData.get('apellidos') as string;
  const dni = formData.get('dni') as string;

  // A. Crear Usuario en AUTH (Sin enviar email de confirmación)
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'docente' }
  });

  if (authError) return { success: false, message: `Error Auth: ${authError.message}` };
  if (!authUser.user) return { success: false, message: 'No se pudo crear el usuario' };

  const userId = authUser.user.id;

  // B. Crear Perfil (Tabla perfiles)
  const { error: perfilError } = await supabaseAdmin.from('perfiles').insert({
    id: userId,
    nombre: nombres,
    apellido: apellidos,
    rol: 'docente',
    colegio_id: colegioId
  });

  if (perfilError) {
    // Rollback: Borrar usuario si falla el perfil
    await supabaseAdmin.auth.admin.deleteUser(userId);
    return { success: false, message: `Error Perfil: ${perfilError.message}` };
  }

  // C. Crear Docente (Tabla docentes)
  const { error: docenteError } = await supabaseAdmin.from('docentes').insert({
    id: userId,
    colegio_id: colegioId,
    nombres,
    apellidos,
    dni,
    email: email // Si tienes columna email en docentes
  });

  if (docenteError) {
    // No hacemos rollback completo por seguridad, pero podrías loguearlo
    return { success: false, message: `Error Datos Docente: ${docenteError.message}` };
  }

  revalidatePath('/[domain]/admin/docentes');
  return { success: true, message: 'Docente creado correctamente' };
}

// 2. CREAR ALUMNO (Login + Perfil + Tabla Alumnos)
export async function crearAlumno(formData: FormData, colegioId: string): Promise<ActionResponse> {
  const email = formData.get('email') as string; // O generar uno: dni@colegio.com
  const password = formData.get('dni') as string;
  const nombres = formData.get('nombres') as string;
  const apellidos = formData.get('apellidos') as string;
  const dni = formData.get('dni') as string;
  const codigo = formData.get('codigo') as string;

  // A. Auth
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'alumno' }
  });

  if (authError) return { success: false, message: `Error Auth: ${authError.message}` };
  
  const userId = authUser.user!.id;

  // B. Perfil
  await supabaseAdmin.from('perfiles').insert({
    id: userId,
    nombre: nombres,
    apellido: apellidos,
    rol: 'alumno',
    colegio_id: colegioId
  });

  // C. Tabla Alumnos
  const { error: alumnoError } = await supabaseAdmin.from('alumnos').insert({
    id: userId,
    colegio_id: colegioId,
    nombres, // Asegúrate de tener estas columnas en 'alumnos' si las usas, o solo usa perfiles
    apellidos,
    dni,
    codigo_estudiante: codigo
  });

  if (alumnoError) return { success: false, message: `Error Alumno: ${alumnoError.message}` };

  revalidatePath('/[domain]/admin/alumnos');
  return { success: true, message: 'Alumno creado correctamente' };
}

// 3. CREAR NIVEL (Solo base de datos, no requiere Auth)
export async function crearNivel(formData: FormData, colegioId: string) {
  const nombre = formData.get('nombre') as string;
  
  const { error } = await supabaseAdmin.from('niveles').insert({
    nombre,
    colegio_id: colegioId
  });

  if (error) return { success: false, message: error.message };
  
  revalidatePath('/[domain]/admin/academico');
  return { success: true, message: 'Nivel creado' };
}

// 4. CREAR GRADO
export async function crearGrado(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const nivelId = formData.get('nivel_id') as string;

  const { error } = await supabaseAdmin.from('grados').insert({
    nombre,
    nivel_id: nivelId
  });

  if (error) return { success: false, message: error.message };
  
  revalidatePath('/[domain]/admin/academico');
  return { success: true, message: 'Grado creado' };
}

// 5. CREAR SECCIÓN
export async function crearSeccion(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const gradoId = formData.get('grado_id') as string;

  const { error } = await supabaseAdmin.from('secciones').insert({
    nombre,
    grado_id: gradoId
  });

  if (error) return { success: false, message: error.message };
  
  revalidatePath('/[domain]/admin/academico');
  return { success: true, message: 'Sección creada' };
}