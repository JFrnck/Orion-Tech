'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle } from 'lucide-react' // Asegúrate de tener lucide-react instalado

export default function LoginForm({ colorMarca }: { colorMarca: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Cliente Supabase para el navegador
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 1. Intentar iniciar sesión (Auth Básico)
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw new Error('Credenciales inválidas, verifica tu correo y contraseña.')
      if (!user) throw new Error('No se pudo identificar al usuario.')

      // ---------------------------------------------------------
      // 2. LÓGICA DE CASCADA (Buscar el Rol en tus tablas reales)
      // ---------------------------------------------------------

      // A) ¿Es un DOCENTE o ADMIN?
      // Buscamos en la tabla 'docentes' usando el ID del usuario autenticado
      const { data: docente, error: errorDocente } = await supabase
        .from('docentes')
        .select('id, colegio_id') 
        .eq('id', user.id)
        .maybeSingle() // Usamos maybeSingle para no lanzar error si no existe

      if (docente) {
        // ¡Es un profe! Redirigimos al panel administrativo/profesor
        // Nota: Si tienes una lógica para distinguir "Admin" de "Profe", agrégala aquí.
        // Por ahora, asumimos que los docentes van al admin o dashboard de profes.
        router.push('/admin/dashboard') 
        router.refresh()
        return
      }

      // B) ¿Es un ALUMNO?
      const { data: alumno, error: errorAlumno } = await supabase
        .from('alumnos')
        .select('id, colegio_id')
        .eq('id', user.id)
        .maybeSingle()

      if (alumno) {
        // ¡Es un alumno! Redirigimos a su plataforma
        router.push('/aula/dashboard') // Ajusta esta ruta a tu app de alumnos
        router.refresh()
        return
      }

      // C) ¿Es un PADRE? (Si implementas la tabla padres a futuro)
      /*
      const { data: padre } = await supabase.from('padres').select('id').eq('id', user.id).maybeSingle()
      if (padre) {
          router.push('/portal/hijos')
          return
      }
      */

      // Si llegamos aquí, el usuario existe en Auth pero NO tiene perfil en ninguna tabla
      await supabase.auth.signOut() // Cerramos sesión por seguridad
      throw new Error('Tu usuario no tiene un perfil asignado (Alumno/Docente). Contacta al colegio.')

    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Ocurrió un error inesperado')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full rounded-lg border-0 bg-slate-800 p-3 text-white placeholder-slate-400 shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all"
            placeholder="usuario@colegio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ ['--tw-ring-color' as any]: colorMarca }} 
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full rounded-lg border-0 bg-slate-800 p-3 text-white placeholder-slate-400 shadow-sm ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ['--tw-ring-color' as any]: colorMarca }}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full justify-center rounded-lg px-3 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        style={{ backgroundColor: colorMarca || '#2563EB' }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            Ingresando...
          </span>
        ) : (
          'Iniciar Sesión'
        )}
      </button>

      <div className="text-center">
        <a href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </form>
  )
}