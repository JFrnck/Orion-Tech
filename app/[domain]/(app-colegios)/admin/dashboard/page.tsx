import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function DashboardPage({ params }: { params: { domain: string } }) {
  // Nota: En Next 15+ "params" es una promesa
  const { domain } = await params; 
  const supabase = await createClient();

  // 1. Obtener ID del Colegio
  const { data: colegio } = await supabase
    .from('colegios')
    .select('id, nombre')
    .eq('subdominio', domain)
    .single();

  if (!colegio) return notFound();

  // 2. Consultas en paralelo a tus tablas REALES
  const [alumnosQuery, docentesQuery, clasesQuery] = await Promise.all([
    supabase.from('alumnos').select('*', { count: 'exact', head: true }).eq('colegio_id', colegio.id),
    supabase.from('docentes').select('*', { count: 'exact', head: true }).eq('colegio_id', colegio.id),
    // Asumiendo que quieres contar clases activas
    supabase.from('clases').select('*', { count: 'exact', head: true }) 
  ]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Panel Directivo</h1>
        <p className="text-slate-500">Bienvenido a la administración de {colegio.nombre}</p>
      </div>

      {/* Grid de KPIs Reales */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card Alumnos */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">🎓</div>
            <div>
              <p className="text-sm font-medium text-slate-500">Estudiantes</p>
              <h3 className="text-2xl font-bold text-slate-900">{alumnosQuery.count || 0}</h3>
            </div>
          </div>
        </div>

        {/* Card Docentes */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600">👨‍🏫</div>
            <div>
              <p className="text-sm font-medium text-slate-500">Docentes</p>
              <h3 className="text-2xl font-bold text-slate-900">{docentesQuery.count || 0}</h3>
            </div>
          </div>
        </div>

        {/* Card Clases (Ejemplo) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-amber-100 p-3 text-amber-600">📚</div>
            <div>
              <p className="text-sm font-medium text-slate-500">Clases Activas</p>
              <h3 className="text-2xl font-bold text-slate-900">{clasesQuery.count || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Área Principal (Placeholder) */}
      <div className="mt-8 min-h-[400px] rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Actividad Reciente</h3>
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-slate-100 bg-slate-50 text-slate-400">
           Aquí se mostrarán gráficos de asistencia o incidencias
        </div>
      </div>
    </div>
  );
}