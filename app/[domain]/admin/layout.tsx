import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>; // Nota: En Next 15+ params es promesa
}) {
  const supabase = await createClient();

  // 1. Verificación de Usuario (Doble seguridad aparte del Middleware)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // 2. Verificación de ROL (CRÍTICO)
  // Evitamos que un "driver" o "client" curioso acceda escribiendo la URL manual
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('rol, nombre')
    .eq('id', user.id)
    .single();

  if (!perfil || perfil.rol !== 'admin') {
    redirect("/"); // Si no es director, ¡fuera!
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* --- SIDEBAR IZQUIERDO --- */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight text-blue-400">Orion Admin</h2>
          <p className="text-xs text-slate-500 mt-1">Panel Institucional</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 text-sm">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-lg text-white">
            <span>📊</span> Dashboard
          </Link>
          <Link href="/admin/usuarios" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
            <span>👥</span> Usuarios
          </Link>
          <Link href="/admin/rutas" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
            <span>🚌</span> Rutas
          </Link>
          <Link href="/admin/pagos" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
            <span>💰</span> Pagos
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                    {perfil.nombre?.charAt(0) || 'U'}
                </div>
                <div className="overflow-hidden">
                    <p className="truncate text-sm font-medium">{perfil.nombre}</p>
                    <p className="text-xs text-slate-500">Director General</p>
                </div>
            </div>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}