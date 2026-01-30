import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Database } from "@/types/supabase";
// Importamos iconos profesionales
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  CreditCard, 
  LogOut, 
  School,
  Library // Nuevo icono para Académico
} from "lucide-react";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;
  const supabase = await createClient();

  // 1. Verificación de Sesión
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${domain}`); 

  // 2. Obtener colegio
  const { data: colegio } = await supabase
    .from('colegios')
    .select('id, nombre')
    .eq('subdominio', domain)
    .single();

  if (!colegio) redirect("/"); 

  // 3. Verificación de Perfil
  const { data: perfil } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (
    !perfil || 
    (perfil.rol !== 'colegio' && perfil.rol !== 'admin') || 
    (perfil.rol === 'colegio' && perfil.colegio_id !== colegio.id)
  ) {
    redirect(`/${domain}`);
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl transition-all">
        
        {/* Header del Sidebar */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg text-blue-500">
            <School size={24} />
          </div>
          <div className="overflow-hidden">
            <h2 className="text-lg font-bold tracking-tight text-white leading-none">Orion Admin</h2>
            <p className="text-xs text-slate-500 mt-1 truncate font-medium" title={colegio.nombre}>
              {colegio.nombre}
            </p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 space-y-1 mt-6 overflow-y-auto">
          <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem href="/admin/alumnos" icon={<GraduationCap size={20} />} label="Alumnos" />
          <NavItem href="/admin/docentes" icon={<Users size={20} />} label="Docentes" />
          
          {/* NUEVO: Distribución Académica */}
          <NavItem href="/admin/academico" icon={<Library size={20} />} label="Académico" />

          <NavItem href="/admin/pagos" icon={<CreditCard size={20} />} label="Pagos" />
        </nav>

        {/* Footer (Perfil) */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg ring-2 ring-slate-800 shrink-0">
                    {perfil.nombre?.charAt(0) || 'U'}
                </div>
                <div className="overflow-hidden flex-1">
                    <p className="truncate text-sm font-medium text-white">
                        {perfil.nombre}
                    </p>
                    <p className="text-xs text-blue-400 font-medium capitalize truncate">
                        {perfil.rol === 'colegio' ? 'Administrador' : perfil.rol}
                    </p>
                </div>
                
                {/* Botón Salir Discreto */}
                <form action="/auth/signout" method="post">
                    <button className="text-slate-500 hover:text-red-400 transition-colors p-2 rounded-md hover:bg-slate-800">
                        <LogOut size={18} />
                    </button>
                </form>
            </div>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        {children}
      </main>
    </div>
  );
}

// Pequeño componente helper para mantener el código limpio
function NavItem({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-900/20"
    >
      <span className="text-slate-400 group-hover:text-white transition-colors">
        {icon}
      </span>
      {label}
    </Link>
  )
}