'use server'

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Acción para crear un Nivel (Ej: Primaria)
export async function crearNivel(formData: FormData, colegioId: string) {
  const supabase = await createClient();
  const nombre = formData.get('nombre') as string;

  const { error } = await supabase
    .from('niveles')
    .insert({
      nombre,
      colegio_id: colegioId,
      orden: 99 // O lógica para calcular el último orden
    });

  if (error) {
    return { success: false, message: error.message };
  }

  // Recarga la página para mostrar el nuevo dato
  revalidatePath('/[domain]/admin/academico', 'page');
  return { success: true };
}

// Acción para crear un Grado
export async function crearGrado(formData: FormData, nivelId: string) {
  const supabase = await createClient();
  const nombre = formData.get('nombre') as string;

  const { error } = await supabase.from('grados').insert({
    nombre,
    nivel_id: nivelId,
  });

  if (error) return { success: false, message: error.message };

  revalidatePath('/[domain]/admin/academico', 'page');
  return { success: true };
}

// Acción para crear Sección
export async function crearSeccion(formData: FormData, gradoId: string) {
    const supabase = await createClient();
    const nombre = formData.get('nombre') as string; // Ej: "A" o "Única"
  
    const { error } = await supabase.from('secciones').insert({
      nombre,
      grado_id: gradoId,
    });
  
    if (error) return { success: false, message: error.message };
  
    revalidatePath('/[domain]/admin/academico', 'page');
    return { success: true };
  }