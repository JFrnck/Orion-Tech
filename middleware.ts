import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. Configuración inicial de la respuesta y cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Cliente Supabase para Middleware (Gestión de Sesión)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Actualizamos las cookies en la Request y en la Response para mantener la sesión viva
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Verificamos al usuario (Esto refresca el token si es necesario)
  const { data: { user } } = await supabase.auth.getUser()

  // --- LOGICA DE MULTI-TENANCY (Subdominios) ---
  
  const url = request.nextUrl
  // Obtener hostname (ej: sanagustin.orion.com)
  let hostname = request.headers.get('host')!.replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

  // Ajuste para Vercel Preview (opcional)
  if (hostname.includes('vercel.app')) {
    hostname = `${hostname.split('.')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  }

  const searchParams = request.nextUrl.searchParams.toString()
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  // A. Dominio Principal (Landing Page) -> Dejar pasar
  if (hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN || hostname === 'www.oriontech.cloud') {
    return response
  }

  // B. Subdominios (Colegios)
  const subdomain = hostname.split('.')[0] // ej: "sanagustin"
  
  // Protección de rutas: Si no hay usuario y quiere entrar a zonas privadas
  if (!user && (path.startsWith('/admin') || path.startsWith('/driver'))) {
     // Redirigir al home del subdominio (Login)
     return NextResponse.redirect(new URL('/', request.url))
  }

  // Reescribir la URL para que Next.js renderice la carpeta /app/[domain]/...
  // Nota: Al hacer rewrite, usamos la 'request' que ya tiene las cookies actualizadas por Supabase
  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, request.url))
}

export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}