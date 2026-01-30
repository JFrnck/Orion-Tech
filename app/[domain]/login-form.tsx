// app/[domain]/login-form.tsx
'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react' // Si no tienes lucide-react, elimina este import y el icono

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
      // 1. Intentar iniciar sesión
      const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw new Error('Credenciales inválidas')
      if (!user) throw new Error('No se pudo identificar al usuario')

      // 2. Verificar el Rol en la base de datos
      const { data: perfil, error: perfilError } = await supabase
        .from('perfiles')
        .select('rol')
        .eq('id', user.id)
        .single()

      if (perfilError || !perfil) {
        throw new Error('Usuario sin perfil asignado en este colegio')
      }

      // 3. Redirección inteligente basada en el Rol
      switch (perfil.rol) {
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'driver':
          router.push('/driver/rutas')
          break
        case 'client': // Padres
          router.push('/portal/hijos') // O la ruta que definas para padres
          break
        case 'inventory':
          router.push('/inventory')
          break
        default:
          router.push('/') // Fallback
      }
      
      // Forzar refresco para que el middleware actualice las cookies
      router.refresh() 

    } catch (err: any) {
      setError(err.message)
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
            required
            className="relative block w-full rounded-md border-0 bg-slate-800 p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="usuario@colegio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ ['--tw-ring-color' as any]: colorMarca }} // Truco para usar el color dinámico en el focus
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="relative block w-full rounded-md border-0 bg-slate-800 p-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ['--tw-ring-color' as any]: colorMarca }}
          />
        </div>
      </div>

      {error && (
        <div className="rounded bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full justify-center rounded-md px-3 py-3 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
        style={{ backgroundColor: colorMarca }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            Ingresando...
          </span>
        ) : (
          'Iniciar Sesión'
        )}
      </button>
    </form>
  )
}