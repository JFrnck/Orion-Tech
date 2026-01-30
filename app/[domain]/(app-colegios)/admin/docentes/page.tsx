import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function ProfesoresPage({ params }: { params: { domain: string } }) {
  const { domain } = await params;
  const supabase = await createClient();

  const { data: colegio } = await supabase.from('colegios').select('id').eq('subdominio', domain).single();
  if (!colegio) return notFound();

  // Fetch usando tabla "docentes"
  const { data: docentes } = await supabase
    .from('docentes')
    .select('*')
    .eq('colegio_id', colegio.id)
    .order('nombres', { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Plana Docente</h1>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
          + Registrar Docente
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docentes?.map((docente) => (
          <div key={docente.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg" 
                     style={{ backgroundColor: docente.color_calendario || '#3B82F6' }}>
                    {docente.nombres.charAt(0)}
                </div>
                <div>
                    <h3 className="text-lg font-medium text-slate-900">{docente.nombres} {docente.apellidos}</h3>
                    <p className="text-sm text-slate-500">{docente.especialidad || 'Docente General'}</p>
                </div>
            </div>
            
            <div className="space-y-2 text-sm text-slate-600 mt-2">
                <div className="flex justify-between">
                    <span>Teléfono:</span>
                    <span className="font-medium">{docente.telefono || '-'}</span>
                </div>
                <div className="flex justify-between">
                    <span>DNI:</span>
                    <span className="font-medium">{docente.dni}</span>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button className="text-blue-600 text-sm font-medium hover:underline">Ver Horario</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}