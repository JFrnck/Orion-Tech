import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <h1 className="text-5xl font-bold tracking-tight text-blue-900">OrionTech</h1>
      <p className="mt-4 text-xl text-slate-600">La plataforma educativa del futuro.</p>
      <div className="mt-8">
        <Link href="http://demo.localhost:3000" className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">
          Ver Demo Colegio
        </Link>
      </div>
    </div>
  )
}