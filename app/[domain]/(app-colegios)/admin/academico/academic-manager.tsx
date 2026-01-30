'use client'

import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  BookOpen, 
  Layers,
  MoreVertical,
  Users
} from 'lucide-react';

export default function AcademicManager({ 
  nivelesIniciales,
  cursos,
  docentes
}: { 
  nivelesIniciales: any[],
  cursos: any[],
  docentes: any[]
}) {
  // Estado para la pestaña activa (ID del nivel seleccionado)
  const [activeTab, setActiveTab] = useState(nivelesIniciales[0]?.id || null);

  // --- ESTADO VACÍO (Si no has corrido el SQL de niveles o no has creado ninguno) ---
  if (nivelesIniciales.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
        <Layers className="h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-medium text-slate-900">Sin estructura académica</h3>
        <p className="text-slate-500 max-w-sm text-center mb-6 text-sm">
          No se encontraron niveles (Primaria, Secundaria) registrados en la base de datos.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm">
          Crear Primer Nivel
        </button>
      </div>
    );
  }

  // Encontrar los datos del nivel activo
  const nivelActivo = nivelesIniciales.find(n => n.id === activeTab);

  return (
    <div className="space-y-6">
      
      {/* 1. PESTAÑAS DE NIVEL (Barra Superior) */}
      <div className="border-b border-slate-200 bg-white px-4 rounded-t-xl shadow-sm">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {nivelesIniciales.map((nivel) => (
            <button
              key={nivel.id}
              onClick={() => setActiveTab(nivel.id)}
              className={`
                whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors outline-none
                ${activeTab === nivel.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}
              `}
            >
              {nivel.nombre}
            </button>
          ))}
          <button className="flex items-center gap-1 py-4 px-3 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 ml-auto transition border-l border-slate-100 pl-6">
            <Plus size={16} /> <span className="hidden sm:inline">Nuevo Nivel</span>
          </button>
        </nav>
      </div>

      {/* 2. CONTENIDO: LISTA DE GRADOS */}
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {nivelActivo?.grados?.map((grado: any) => (
          <div key={grado.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Cabecera del Grado */}
            <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icono con el número/inicial del grado */}
                <div className="h-10 w-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 font-bold shadow-sm text-sm">
                  {grado.nombre.match(/\d+/) ? grado.nombre.match(/\d+/)[0] + '°' : grado.nombre.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{grado.nombre}</h3>
                  <p className="text-xs text-slate-500">
                    {grado.secciones?.length || 0} secciones habilitadas
                  </p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-blue-600 transition p-2 hover:bg-slate-100 rounded-full">
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Grid de Secciones */}
            <div className="p-6 bg-slate-50/30">
               {(!grado.secciones || grado.secciones.length === 0) ? (
                  <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
                    <p className="text-xs text-slate-500 mb-2">No hay secciones (A, B, C...) en este grado</p>
                    <button className="text-blue-600 text-xs font-bold hover:underline uppercase tracking-wide">
                        + Crear Sección A
                    </button>
                  </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {grado.secciones.map((seccion: any) => (
                      <SeccionCard key={seccion.id} seccion={seccion} />
                    ))}
                    
                    {/* Botón Nueva Sección */}
                    <button className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all min-h-[150px] gap-2 group">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <Plus size={16} />
                      </div>
                      <span className="font-medium text-xs">Nueva Sección</span>
                    </button>
                 </div>
               )}
            </div>
          </div>
        ))}

        {/* Estado vacío del Grado */}
        {(!nivelActivo?.grados || nivelActivo.grados.length === 0) && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                <p className="text-slate-500 mb-2">Este nivel no tiene grados registrados.</p>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 shadow-lg shadow-slate-900/20">
                    + Agregar Grado (Ej: 1er Grado)
                </button>
            </div>
        )}
      </div>
    </div>
  );
}

// 3. TARJETA DE SECCIÓN (Acordeón de Cursos)
function SeccionCard({ seccion }: { seccion: any }) {
  const [isOpen, setIsOpen] = useState(false); // Por defecto cerrado para limpieza visual

  return (
    <div className={`bg-white border rounded-xl transition-all duration-200 flex flex-col ${isOpen ? 'ring-2 ring-blue-500/20 border-blue-300 shadow-md' : 'border-slate-200 shadow-sm hover:border-blue-300'}`}>
      
      {/* Cabecera Clickable */}
      <div 
        className="p-4 flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className={`h-6 w-6 rounded flex items-center justify-center transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
             {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Sección "{seccion.nombre}"</h4>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
                {seccion.clases?.length || 0} CURSOS
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Cursos Expandible */}
      {isOpen && (
        <div className="px-3 pb-3 pt-0 flex-1 flex flex-col">
            <div className="space-y-2 border-t border-slate-100 pt-3 mb-3">
                {seccion.clases?.map((clase: any) => (
                    <div key={clase.id} className="flex items-center justify-between group p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                        {/* Nombre del Curso */}
                        <div className="flex items-center gap-2 overflow-hidden">
                            <BookOpen size={14} className="text-blue-500 shrink-0" />
                            <span className="text-xs font-medium text-slate-700 truncate max-w-[120px]" title={clase.cursos?.nombre}>
                                {clase.cursos?.nombre || 'Curso s/n'}
                            </span>
                        </div>
                        
                        {/* Avatar del Profesor */}
                        <div className="shrink-0">
                            {clase.docentes ? (
                                <div className="flex items-center gap-1.5 bg-white pl-1 pr-2 py-0.5 rounded-full border border-slate-200 shadow-sm" title={`${clase.docentes.nombres} ${clase.docentes.apellidos}`}>
                                    <div className="h-4 w-4 rounded-full bg-slate-100 overflow-hidden">
                                       {/* eslint-disable-next-line @next/next/no-img-element */}
                                       {clase.docentes.foto_url ? (
                                          <img src={clase.docentes.foto_url} alt="" className="h-full w-full object-cover" />
                                       ) : (
                                          <Users size={10} className="m-[3px] text-slate-400" />
                                       )}
                                    </div>
                                    <span className="text-[10px] text-slate-600 font-semibold max-w-[60px] truncate">
                                        {clase.docentes.nombres.split(' ')[0]}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                                    Vacante
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="mt-auto w-full py-2 text-xs font-semibold text-slate-500 border border-dashed border-slate-300 rounded-lg hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5">
                <Plus size={12} /> Asignar Curso
            </button>
        </div>
      )}
    </div>
  )
}