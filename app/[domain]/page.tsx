// app/[domain]/page.tsx
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase"; 
import LoginForm from "./login-form"; // <--- Importamos el componente cliente

export default async function SchoolLoginPage({ params }: { params: { domain: string } }) {
  // 1. Obtenemos el subdominio
  // Nota: En Next.js 15 'params' es una promesa, asegúrate de esperarla si usas la v15
  // Si usas Next 14, quita el 'await' antes de params si te da error.
  const { domain } = await params; 

  // 2. Conectamos a Supabase (Servidor)
  const supabase = await createClient();
  
  const { data: colegio } = await supabase
    .from('colegios')
    .select('nombre, logo_url, color_marca')
    .eq('subdominio', domain)
    .single();

  if (!colegio) {
    return notFound();
  }

  // Fallback por si el colegio no tiene color definido
  const brandColor = colegio.color_marca || '#3B82F6';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-slate-800 bg-slate-900 p-8 shadow-xl">
        
        {/* Encabezado: Logo y Nombre */}
        <div className="text-center">
            {colegio.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={colegio.logo_url} alt={colegio.nombre} className="mx-auto h-24 w-auto object-contain" />
            ) : (
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-4xl">
                    🏫
                </div>
            )}
            
            <h2 className="mt-6 text-3xl font-extrabold" style={{ color: brandColor }}>
                {colegio.nombre}
            </h2>
            <p className="mt-2 text-sm text-slate-400">Plataforma de Gestión Escolar</p>
        </div>

        {/* Formulario Interactivo (Client Component) */}
        <LoginForm colorMarca={brandColor} />

        <div className="text-center text-xs text-slate-600 mt-8">
            Sistema seguro proporcionado por <span className="text-slate-500 font-semibold">OrionTech</span>
        </div>
      </div>
    </div>
  );
}