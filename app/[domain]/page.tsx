import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase"; 
import LoginForm from "./login-form";

export default async function SchoolLoginPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params; 

  // LOG 1: ¿Llegamos aquí? ¿Qué dominio recibimos?
  console.log("------------------------------------------------");
  console.log(`🔍 [PAGE] Cargando página para dominio: "${domain}"`);

  const supabase = await createClient();
  
  const { data: colegio, error } = await supabase
    .from('colegios')
    .select('nombre, logo_url, color_marca, subdominio') // Traigo subdominio también para verificar
    .eq('subdominio', domain)
    .single();

  // LOG 2: ¿Qué dijo Supabase?
  if (error) {
    console.error("❌ [PAGE] Error Supabase:", error.message, error.details);
  }
  
  if (colegio) {
    console.log("✅ [PAGE] Colegio encontrado:", colegio.nombre);
  } else {
    console.warn("⚠️ [PAGE] Colegio NO encontrado (Data es null)");
  }
  console.log("------------------------------------------------");

  if (!colegio) {
    return notFound();
  }

  const brandColor = colegio.color_marca || '#3B82F6';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white relative overflow-hidden">
      
      <div 
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ backgroundColor: brandColor }}
      />
      <div 
        className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ backgroundColor: brandColor }}
      />

      <div className="w-full max-w-md space-y-8 rounded-xl border border-slate-800/50 bg-slate-900/80 backdrop-blur-sm p-8 shadow-2xl relative z-10">
        <div className="text-center">
            {colegio.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={colegio.logo_url} 
                  alt={colegio.nombre} 
                  className="mx-auto h-24 w-auto object-contain drop-shadow-lg" 
                />
            ) : (
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-4xl shadow-inner">
                    🏫
                </div>
            )}
            
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
                {colegio.nombre}
            </h2>
            <p className="mt-2 text-sm text-slate-400 font-medium">Portal Académico</p>
        </div>

        <LoginForm colorMarca={brandColor} domain={domain} />

        <div className="text-center text-xs text-slate-600 mt-8 pt-4 border-t border-slate-800">
            Powered by <span className="text-slate-500 font-bold hover:text-white transition-colors cursor-pointer">OrionTech Cloud</span>
        </div>
      </div>
    </div>
  );
}