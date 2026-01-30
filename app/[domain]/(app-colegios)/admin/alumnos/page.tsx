import { createClient } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  User, 
  GraduationCap
} from "lucide-react";

export default async function AlumnosPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  const supabase = await createClient();

  // 1. Verificación de sesión
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${domain}`);

  // 2. Obtener colegio
  const { data: colegio } = await supabase
    .from('colegios')
    .select('id')
    .eq('subdominio', domain)
    .single();

  if (!colegio) return notFound();

  // 3. QUERY CORREGIDA: Usamos el nombre de la tabla 'perfiles', no 'id'
  const { data: alumnos, error } = await supabase
    .from("alumnos")
    .select(`
      *,
      perfiles (   
        nombre,
        apellido,
        foto_url,
        rol
      ),
      matriculas (
        estado,
        secciones ( nombre, grados ( nombre ) )
      )
    `)
    .eq('colegio_id', colegio.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error cargando alumnos:", error);
    return <div className="p-6 text-red-500 bg-red-50 rounded-lg">Error crítico de base de datos: {error.message}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Gestión de Alumnos</h1>
            <p className="text-sm text-slate-500">Administra los estudiantes matriculados</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center gap-2 shadow-sm">
          <Plus size={18} />
          Nuevo Alumno
        </button>
      </div>

      {/* Buscador Visual */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm max-w-md">
        <Search size={20} className="text-slate-400 ml-2" />
        <input 
            type="text" 
            placeholder="Buscar por nombre o DNI..." 
            className="flex-1 border-none focus:ring-0 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
        />
      </div>

      {/* Tabla */}
      <div className="border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Estudiante</th>
              <th className="py-3 px-4">Código / DNI</th>
              <th className="py-3 px-4">Grado Actual</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {alumnos?.map((alumno) => {
                // Relación 1 a 1: 'perfiles' devuelve un objeto, no un array
                const perfil = alumno.perfiles; 
                
                // @ts-ignore
                const nombreCompleto = perfil ? `${perfil.apellido}, ${perfil.nombre}` : "Sin Perfil";
                // @ts-ignore
                const foto = perfil?.foto_url;
                
                const matricula = alumno.matriculas?.[0]; 
                // @ts-ignore
                const gradoInfo = matricula?.secciones 
                    // @ts-ignore
                    ? `${matricula.secciones.grados.nombre} - ${matricula.secciones.nombre}` 
                    : "Sin matricular";
                
                const estado = matricula?.estado || '---';

                return (
                  <tr key={alumno.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden text-slate-500 border border-slate-200 shrink-0">
                            {foto ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={foto} alt="avatar" className="h-full w-full object-cover" />
                            ) : (
                                <User size={20} />
                            )}
                        </div>
                        <div>
                            <div className="font-medium text-slate-900">{nombreCompleto}</div>
                            {/* @ts-ignore */}
                            {(alumno.info_medica as any)?.alergias && (
                                <div className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-0.5">
                                    ⚠️ Alergias reportadas
                                </div>
                            )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                        <div className="flex flex-col">
                             <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded w-fit">
                                {alumno.codigo_estudiante || "---"}
                            </span>
                            <span className="text-xs text-slate-400 mt-0.5">{alumno.dni}</span>
                        </div>
                    </td>
                    <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-slate-600">
                            <GraduationCap size={16} className="text-slate-400" />
                            {gradoInfo}
                        </div>
                    </td>
                    <td className="py-3 px-4">
                       <StatusBadge estado={estado} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                )
            })}
             {(!alumnos || alumnos.length === 0) && (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="p-4 bg-slate-50 rounded-full">
                        <User size={32} className="opacity-50" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-600">No hay alumnos registrados</p>
                        <p className="text-sm">Comienza agregando uno nuevo al sistema.</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Componente visual para estados
function StatusBadge({ estado }: { estado: string }) {
    const styles: any = {
        activo: "bg-emerald-100 text-emerald-700 border-emerald-200",
        retirado: "bg-red-100 text-red-700 border-red-200",
        suspendido: "bg-amber-100 text-amber-700 border-amber-200",
        egresado: "bg-blue-100 text-blue-700 border-blue-200",
        '---': "bg-slate-100 text-slate-500 border-slate-200"
    };

    const currentStyle = styles[estado] || styles['---'];

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentStyle} capitalize`}>
            {estado === '---' ? 'Sin Matrícula' : estado}
        </span>
    );
}