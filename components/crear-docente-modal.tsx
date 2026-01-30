'use client'

import { useState } from 'react';
import { crearDocente } from '@/actions/admin-actions'; // Importamos la acción

export function CrearDocenteModal({ colegioId }: { colegioId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    // Llamamos a la Server Action (el servidor hace todo el trabajo pesado con Service Role)
    const res = await crearDocente(formData, colegioId);
    
    setLoading(false);
    
    if (res.success) {
      alert("¡Docente creado!");
      setIsOpen(false);
    } else {
      alert("Error: " + res.message);
    }
  }

  if (!isOpen) return <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Nuevo Docente</button>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Registrar Docente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nombres" placeholder="Nombres" required className="w-full border p-2 rounded" />
          <input name="apellidos" placeholder="Apellidos" required className="w-full border p-2 rounded" />
          <input name="dni" placeholder="DNI (Será su contraseña)" required className="w-full border p-2 rounded" />
          <input name="email" type="email" placeholder="Correo Electrónico" required className="w-full border p-2 rounded" />
          
          <div className="flex justify-end gap-2 mt-6">
             <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-slate-600">Cancelar</button>
             <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
               {loading ? 'Creando...' : 'Guardar Docente'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}