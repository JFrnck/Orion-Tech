'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle } from 'lucide-react'
import { Database } from '@/types/supabase'

export default function LoginForm({ colorMarca, domain }: { colorMarca: string, domain: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 1. Autenticación (Email/Pass)
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw new Error('Credenciales inválidas.')
      if (!user) throw new Error('Usuario no identificado.')

      // 2. Obtener Perfil y Rol
      const { data: perfil, error: perfilError } = await supabase
        .from('perfiles')
        .select('rol, colegio_id')
        .eq('id', user.id)
        .single()

      if (perfilError || !perfil) {
        throw new Error('No se encontró un perfil asociado a este usuario.')
      }

      // 3. Verificación de Seguridad: ¿Pertenece este usuario a este colegio?
      const { data: colegioActual } = await supabase
        .from('colegios')
        .select('id')
        .eq('subdominio', domain)
        .single()

      // Si el rol NO es admin global Y el ID del colegio no coincide, bloqueamos el acceso
      if (!colegioActual || (perfil.rol !== 'admin' && perfil.colegio_id !== colegioActual.id)) {
        await supabase.auth.signOut() // Cerramos la sesión válida de Auth para no dejar "fantasmas"
        throw new Error('Tu usuario no pertenece a esta institución.')
      }

      // 4. Redirección basada en ROL (RUTAS LIMPIAS)
      // Importante: Al estar ya dentro del subdominio gracias al middleware,
      // NO debemos incluir '/[domain]' en la ruta. Usamos rutas relativas a la raíz.
      switch (perfil.rol) {
        case 'colegio': // Admin del colegio
        case 'admin':   // SuperAdmin SaaS
          router.push('/admin/dashboard') 
          break
        case 'docente':
          router.push('/docente/dashboard') // Ajusta si tu ruta es diferente
          break
        case 'alumno':
          router.push('/aula') // Ajusta si tu ruta es diferente
          break
        case 'padre':
          router.push('/padres') // Ajusta si tu ruta es diferente
          break
        default:
          router.push('/')
      }

      router.refresh()

    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Error al iniciar sesión')
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
            type="email"
            required
            className="block w-full rounded-lg border-0 bg-slate-800 p-3 text-white placeholder-slate-400 ring-1 ring-slate-700 focus:ring-2 sm:text-sm transition-all"
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
            type="password"
            required
            className="block w-full rounded-lg border-0 bg-slate-800 p-3 text-white placeholder-slate-400 ring-1 ring-slate-700 focus:ring-2 sm:text-sm transition-all"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ['--tw-ring-color' as any]: colorMarca }}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20 animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full justify-center rounded-lg px-3 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 disabled:opacity-50 transition-all"
        style={{ backgroundColor: colorMarca || '#2563EB' }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            Verificando...
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