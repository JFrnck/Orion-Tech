import { createClient } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";
import AcademicManager from "./academic-manager"; // Importamos el componente cliente

export default async function AcademicoPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  const supabase = await createClient();

  // 1. Auth & Colegio
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${domain}`);

  const { data: colegio } = await supabase
    .from('colegios')
    .select('id')
    .eq('subdominio', domain)
    .single();

  if (!colegio) return notFound();

  // 2. Obtener Jerarquía Completa (Niveles -> Grados -> Secciones -> Clases -> Cursos/Docentes)
  // Esta consulta anidada es muy eficiente.
  const { data: niveles } = await supabase
    .from('niveles')
    .select(`
      id, nombre, orden,
      grados (
        id, nombre,
        secciones (
          id, nombre,
          clases (
            id,
            cursos ( nombre ),
            docentes ( nombres, apellidos, foto_url )
          )
        )
      )
    `)
    .eq('colegio_id', colegio.id)
    .order('orden', { ascending: true });

  // 3. Catálogo para los selectores (Crear nuevos cursos/clases)
  const { data: catalogoCursos } = await supabase
    .from('cursos')
    .select('id, nombre')
    .eq('colegio_id', colegio.id);

  const { data: listaDocentes } = await supabase
    .from('docentes')
    .select('id, nombres, apellidos, foto_url')
    .eq('colegio_id', colegio.id);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Distribución Académica</h1>
        <p className="text-sm text-slate-500">
          Organiza la estructura educativa: Niveles, Grados, Secciones y carga académica.
        </p>
      </div>

      {/* Pasamos toda la data al gestor visual */}
      <AcademicManager 
        nivelesIniciales={niveles || []} 
        cursos={catalogoCursos || []}
        docentes={listaDocentes || []}
      />
    </div>
  );
}