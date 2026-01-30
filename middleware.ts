import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // LOG 1: Ver qué petición llega
  console.log("------------------------------------------------");
  console.log("🔍 [Middleware] Petición entrante:", req.url);

  let hostname = req.headers.get("host")!;
  
  // Limpieza de puerto
  hostname = hostname.replace(":3000", ""); 

  // LOG 2: Ver el hostname limpio
  console.log("🔍 [Middleware] Hostname detectado:", hostname);

  const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";
  const subdomain = hostname.replace(`.${mainDomain}`, "");
  
  const isSubdomain = hostname !== mainDomain && hostname !== "www";

  // LOG 3: Ver qué decidió el middleware
  console.log(`🔍 [Middleware] ¿Es subdominio?: ${isSubdomain} (Subdominio extraído: "${subdomain}")`);

  if (isSubdomain) {
    const newUrl = new URL(`/${subdomain}${url.pathname}`, req.url);
    
    // LOG 4: Ver la reescritura final
    console.log("✅ [Middleware] REESCRIBIENDO a:", newUrl.toString());
    console.log("------------------------------------------------");
    
    return NextResponse.rewrite(newUrl);
  }

  console.log("➡️ [Middleware] Pasando directo (sin subdominio)");
  console.log("------------------------------------------------");
  return NextResponse.next();
}