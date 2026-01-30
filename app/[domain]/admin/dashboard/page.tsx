export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Título de la sección */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Vista General</h1>
        <p className="text-slate-500">Bienvenido de nuevo al panel de control.</p>
      </div>

      {/* Grid de Estadísticas (KPIs) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Tarjeta 1 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
               🚌
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Rutas Activas</p>
              <h3 className="text-2xl font-bold text-slate-900">12</h3>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
               👥
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Alumnos</p>
              <h3 className="text-2xl font-bold text-slate-900">450</h3>
            </div>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-amber-100 p-3 text-amber-600">
               ⚠️
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Incidencias</p>
              <h3 className="text-2xl font-bold text-slate-900">2</h3>
            </div>
          </div>
        </div>
        
        {/* Tarjeta 4 */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
           <div className="flex items-center gap-4">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-600">
               💰
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pagos Pend.</p>
              <h3 className="text-2xl font-bold text-slate-900">S/ 1.2k</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Área de Contenido Principal / Gráficos */}
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm h-96 flex items-center justify-center text-slate-400 border-dashed">
         Aquí irán los gráficos de rendimiento y mapas en tiempo real 🚀
      </div>
    </div>
  );
}