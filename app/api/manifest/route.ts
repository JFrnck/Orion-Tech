import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Sacamos el subdominio de la URL
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0]; 

  // Aquí buscarías en tu BD los datos del colegio usando el 'subdomain'
  // const schoolData = await db.schools.find(subdomain)...
  
  // Datos simulados:
  const schoolName = subdomain === 'sanagustin' ? 'Colegio San Agustín' : 'Orion App';
  const themeColor = subdomain === 'sanagustin' ? '#FF0000' : '#000000';

  return NextResponse.json({
    name: schoolName,
    short_name: schoolName,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: themeColor,
    icons: [
      {
        src: "/icon-default.png", // Podrías devolver una URL dinámica de Supabase Storage
        sizes: "192x192",
        type: "image/png"
      }
    ]
  });
}