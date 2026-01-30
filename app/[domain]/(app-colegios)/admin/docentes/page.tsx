import { createClient } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";
import { 
  Plus, 
  Search, 
  Phone, 
  User, 
  Calendar,
  MoreHorizontal,
  Mail
} from "lucide-react";

export default async function DocentesPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  const supabase = await createClient();

  // 1. Verificación de sesión
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${domain}`);

  // 2. Obtener contexto del colegio
  const { data: colegio } = await supabase
    .from('colegios')
    .select('id')
    .eq('subdominio', domain)
    .single();

  if (!colegio) return notFound();

  // 3. Obtener docentes
  const { data: docentes, error } = await supabase
    .from('docentes')
    .select('*')
    .eq('colegio_id', colegio.id)
    .order('created_at', { ascending: false }); // Los más recientes primero

  if (error) {
    console.error("Error al cargar docentes:", error);
    return <div className="p-6 text-red-500">Error cargando la plana docente.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Plana Docente</h1>
            <p className="text-sm text-slate-500">Gestiona a los profesores y sus asignaciones.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center gap-2 shadow-sm">
          <Plus size={18} />
          Registrar Docente
        </button>
      </div>

      {/* Barra de Filtros */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm max-w-md">
        <Search size={20} className="text-slate-400 ml-2" />
        <input 
            type="text" 
            placeholder="Buscar por nombre o especialidad..." 
            className="flex-1 border-none focus:ring-0 text-sm text-slate-700 placeholder:text-slate-400 outline-none"
        />
      </div>

      {/* Grid de Docentes */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {docentes?.map((docente) => (
          <div key={docente.id} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            
            {/* Botón de opciones flotante */}
            <button className="absolute top-4 right-4 text-slate-400 hover:text-blue-600 transition-colors">
                <MoreHorizontal size={20} />
            </button>

            {/* Cabecera de la Tarjeta */}
            <div className="flex items-start gap-4 mb-4">
                <div 
                    className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0" 
                    style={{ backgroundColor: docente.color_calendario || '#3B82F6' }}
                >
                    {/* Iniciales */}
                    {(docente.nombres || 'D').charAt(0)}
                </div>
                <div className="pr-6"> {/* Padding right para no chocar con el botón de opciones */}
                    <h3 className="text-base font-bold text-slate-900 truncate" title={`${docente.nombres} ${docente.apellidos}`}>
                        {docente.nombres} {docente.apellidos}
                    </h3>
                    <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit mt-1">
                        {docente.especialidad || 'Docente General'}
                    </p>
                </div>
            </div>
            
            {/* Información de Contacto */}
            <div className="space-y-3 text-sm text-slate-600 mt-2 flex-1">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                    <Phone size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-700">{docente.telefono || 'Sin teléfono'}</span>
                </div>
                <div className="flex items-center gap-3 px-2">
                    <User size={16} className="text-slate-400" />
                    <span className="text-slate-500">DNI: {docente.dni || '---'}</span>
                </div>
            </div>

            {/* Footer de Acciones */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button className="text-slate-500 hover:text-blue-600 text-xs font-medium flex items-center gap-1 transition-colors">
                    <Calendar size={14} />
                    Ver Horario
                </button>
                <button className="text-slate-500 hover:text-blue-600 text-xs font-medium flex items-center gap-1 transition-colors">
                    <Mail size={14} />
                    Contactar
                </button>
            </div>
          </div>
        ))}

        {/* Estado Vacío */}
        {(!docentes || docentes.length === 0) && (
            <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="p-4 bg-white rounded-full shadow-sm">
                        <User size={32} className="opacity-50" />
                    </div>
                    <div>
                        <p className="font-medium text-slate-600">No hay docentes registrados</p>
                        <p className="text-sm">Agrega al primer profesor para comenzar a asignar clases.</p>
                    </div>
                    <button className="mt-2 text-blue-600 text-sm font-medium hover:underline">
                        Registrar mi primer docente
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}