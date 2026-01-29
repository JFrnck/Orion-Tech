import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  
  // Obtenemos el dominio actual (ej: demo.localhost:3000)
  let hostname = req.headers
    .get('host')!
    .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

  // Ajuste para Vercel Preview (opcional)
  if (hostname.includes('vercel.app')) {
    hostname = `${hostname.split('.')[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  }

  const searchParams = req.nextUrl.searchParams.toString()
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  // 1. SI ESTAMOS EN EL DOMINIO PRINCIPAL (Landing Page)
  if (hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN || hostname === 'www.oriontech.cloud') {
    return NextResponse.next()
  }

  // 2. SI HAY UN SUBDOMINIO (ej: demo.oriontech.cloud)
  const subdomain = hostname.split('.')[0]
  
  // Reescribimos la URL internamente a la carpeta /app/[domain]/...
  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url))
}

export const config = {
  matcher: [
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}