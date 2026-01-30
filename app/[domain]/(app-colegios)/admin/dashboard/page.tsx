import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Activity, 
  TrendingUp,
  Calendar
} from "lucide-react";

export default async function DashboardPage({ params }: { params: Promise<{ domain: string }> }) {
  // 1. Resolver params (Next.js 15)
  const { domain } = await params; 
  const supabase = await createClient();

  // 2. Obtener datos del Colegio
  const { data: colegio } = await supabase
    .from('colegios')
    .select('id, nombre')
    .eq('subdominio', domain)
    .single();

  if (!colegio) return notFound();

  // 3. Consultas en paralelo (KPIs)
  // Usamos { head: true, count: 'exact' } para que sea muy rápido y no descargue datos, solo cuente.
  const [alumnosQuery, docentesQuery, cursosQuery] = await Promise.all([
    supabase.from('alumnos').select('*', { count: 'exact', head: true }).eq('colegio_id', colegio.id),
    supabase.from('docentes').select('*', { count: 'exact', head: true }).eq('colegio_id', colegio.id),
    // Consultamos 'cursos' en lugar de clases por seguridad (tiene colegio_id directo)
    supabase.from('cursos').select('*', { count: 'exact', head: true }).eq('colegio_id', colegio.id)
  ]);

  return (
    <div className="p-6 space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Panel General</h1>
          <p className="text-slate-500 mt-1">
            Resumen de actividad para <span className="font-semibold text-slate-700">{colegio.nombre}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border shadow-sm">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('es-ES', { dateStyle: 'long' })}</span>
        </div>
      </div>

      {/* Grid de KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* KPI: Estudiantes */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600 ring-1 ring-blue-100">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Estudiantes</p>
              <h3 className="text-2xl font-bold text-slate-900">{alumnosQuery.count || 0}</h3>
            </div>
          </div>
          {/* Decoración de fondo */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50/50 blur-2xl" />
        </div>

        {/* KPI: Docentes */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600 ring-1 ring-emerald-100">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Docentes</p>
              <h3 className="text-2xl font-bold text-slate-900">{docentesQuery.count || 0}</h3>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-50/50 blur-2xl" />
        </div>

        {/* KPI: Cursos */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-amber-50 p-3 text-amber-600 ring-1 ring-amber-100">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Cursos / Talleres</p>
              <h3 className="text-2xl font-bold text-slate-900">{cursosQuery.count || 0}</h3>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-50/50 blur-2xl" />
        </div>

         {/* KPI: Actividad (Simulado por ahora) */}
         <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-violet-50 p-3 text-violet-600 ring-1 ring-violet-100">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Asistencia Hoy</p>
              <h3 className="text-2xl font-bold text-slate-900">--%</h3>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-violet-50/50 blur-2xl" />
        </div>
      </div>

      {/* Sección Gráficos / Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico Principal (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-slate-400" />
                    Rendimiento Académico
                </h3>
                <select className="text-sm border-none bg-slate-50 rounded-md text-slate-500 px-2 py-1 focus:ring-0 cursor-pointer hover:text-slate-700">
                    <option>Este mes</option>
                    <option>Este año</option>
                </select>
            </div>
            
            {/* Placeholder del Gráfico */}
            <div className="h-64 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 text-slate-400 gap-2">
               <Activity className="h-8 w-8 opacity-50" />
               <p className="text-sm">Gráfico de rendimiento en desarrollo</p>
            </div>
        </div>

        {/* Panel Lateral / Accesos Rápidos (Ocupa 1 columna) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 font-medium text-sm transition-colors border border-transparent hover:border-blue-100 flex items-center justify-between group">
                    Matricular Alumno
                    <span className="text-slate-300 group-hover:text-blue-400">→</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 font-medium text-sm transition-colors border border-transparent hover:border-emerald-100 flex items-center justify-between group">
                    Registrar Asistencia
                    <span className="text-slate-300 group-hover:text-emerald-400">→</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-700 font-medium text-sm transition-colors border border-transparent hover:border-amber-100 flex items-center justify-between group">
                    Publicar Comunicado
                    <span className="text-slate-300 group-hover:text-amber-400">→</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}