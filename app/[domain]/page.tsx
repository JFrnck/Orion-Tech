import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase"; 

export default async function SchoolLoginPage({ params }: { params: { domain: string } }) {
  // 1. Obtenemos el subdominio de la URL (ej: 'demo')
  const { domain } = await params;

  // 2. Conectamos a Supabase para buscar el colegio
  const supabase = createClient();
  
  // CORRECCIÓN: Usamos 'colegios' (Español) en lugar de 'schools'
  const { data: colegio } = await supabase
    .from('colegios') // Nombre correcto de la tabla
    .select('nombre, logo_url, color_marca') // Columnas en español
    .eq('subdominio', domain) // Columna en español
    .single();

  // 3. Si no existe el colegio, mostramos 404
  if (!colegio) {
    return notFound();
  }

  // 4. Si existe, mostramos su Login personalizado
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <div className="text-center">
            {/* Logo o Icono */}
            {colegio.logo_url ? (
                <img src={colegio.logo_url} alt={colegio.nombre} className="mx-auto h-20 w-auto" />
            ) : (
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-3xl">
                    🏫
                </div>
            )}
            
            {/* Nombre del Colegio (Dinámico) */}
            <h2 className="mt-6 text-3xl font-extrabold" style={{ color: colegio.color_marca || '#3B82F6' }}>
                {colegio.nombre}
            </h2>
            <p className="mt-2 text-sm text-slate-400">Panel de Acceso Institucional</p>
        </div>

        {/* Placeholder del Formulario */}
        <div className="mt-8 space-y-6">
            <div className="rounded-md bg-blue-500/10 p-4 text-center text-blue-400 border border-blue-500/20">
                Formulario de Login Próximamente
            </div>
            
            <div className="text-center text-xs text-slate-500">
              Sistema gestionado por OrionTech
            </div>
        </div>
      </div>
    </div>
  );
}