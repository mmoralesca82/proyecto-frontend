'use client'

import { useSession } from "next-auth/react"


const DashboardPage = () => {
  const { data: session } = useSession()

  return (
    <main className='container mx-60 p-6 pt-24'>
      <section className='mt-6'>
        
        <h1 className='text-xl'>
          <span className="text-2xl">{session?.user.username}</span>, bienvenido a la INTRANET de la clínica "CONSALUD"</h1>
        <section className='mx-8'>
          <h2 className="my-6">RECOMENDACIONES DE SEGURIDAD:</h2>
          <ol className='mx-6'>
            <li>El usuario es personal, no comparta sus credenciales.</li>
            <li>Cierre sesión al finalizar su turno.</li>
          </ol>
        </section>

      </section>
    </main>
   
  )
}

export default DashboardPage