import Link from 'next/link'

const AdmisionPage = () => {
  return (
    <main className="container mx-60 p-6 pt-24">
      <section className="mt-6 grid lg:grid-cols-4 grid-cols-2 gap-4">
        

        <article className="border rounded-lg bg-slate-600 m-2 p-2 h-16 hover:bg-gray-400">
          <Link href="/dashboard/admision/registro-paciente">
            <p className="text-white text-center  xl:text-xl xl:pt-2 ">Registro Paciente</p>
          </Link>
        </article>
        <article className="border rounded-lg bg-slate-600 m-2 p-2 h-16 hover:bg-gray-400">
          <Link href="/dashboard/admision/informacion-paciente">
            <p className="text-white text-center  xl:text-xl xl:pt-2">Información Paciente</p>
          </Link>
        </article>
        <article className="border rounded-lg bg-slate-600 m-2 p-2 h-16 hover:bg-gray-400">
          <Link href="/dashboard/admision/registro-consulta">
            <p className= "text-white text-center  xl:text-xl xl:pt-2">Registro Consulta</p>
          </Link>
        </article>
        <article className="border rounded-lg bg-slate-600 m-2 p-2 h-16 hover:bg-gray-400">
          <Link href="/dashboard/admision/gestion-consulta">
            <p className="text-white text-center  xl:text-xl xl:pt-2">Gestión Consulta</p>
          </Link>
        </article>
      </section>
    </main>
  )
}

export default AdmisionPage