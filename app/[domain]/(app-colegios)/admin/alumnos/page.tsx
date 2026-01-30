import { createClient } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function AlumnosPage({ params }: { params: { domain: string } }) {
  const { domain } = await params;
  const supabase = await createClient();

  const { data: colegio } = await supabase.from('colegios').select('id').eq('subdominio', domain).single();
  if (!colegio) return notFound();

  // Fetch usando tu tabla real "alumnos"
  const { data: alumnos } = await supabase
    .from('alumnos')
    .select('*')
    .eq('colegio_id', colegio.id)
    .order('apellidos', { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Directorio de Alumnos</h1>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + Nuevo Alumno
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">DNI</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Código</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {alumnos?.map((alumno) => (
              <tr key={alumno.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                       {alumno.nombres.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{alumno.apellidos}, {alumno.nombres}</div>
                      {/* Si info_medica es JSON, podrías mostrar una alerta aquí si tiene condición */}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{alumno.dni}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">{alumno.codigo_estudiante || '-'}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-blue-600 hover:text-blue-900 cursor-pointer">
                  Editar
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!alumnos || alumnos.length === 0) && (
            <div className="p-12 text-center text-slate-500">No se encontraron alumnos registrados.</div>
        )}
      </div>
    </div>
  );
}