import Link from 'next/link'

const AdministracionPage = () => {
  return (
    <main className="container mx-60 p-6 pt-24">
    <section className="mt-6 grid lg:grid-cols-4 grid-cols-2 gap-4">
      

      <article className="border rounded-lg bg-slate-600 m-2 p-2 h-16 hover:bg-gray-400">
        <Link href="/dashboard/administracion/registro-usuario">
          <p className="text-white text-center  xl:text-xl xl:pt-2 ">Registrar usuario</p>
        </Link>
      </article>
      
    </section>
  </main>
  )
}

export default AdministracionPage