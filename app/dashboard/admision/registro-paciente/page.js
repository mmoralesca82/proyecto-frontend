'use client'

import FormularioRegistroPaciente from "@/app/components/registro-paciente/FormularioRegistroPaciente"

const RegistroPaciente = () => {
  return (
    <main className='container m-auto p-6 pt-10 mx-60'>
      <div className="mx-auto flex w-full flex-col justify-center p-16">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1 text-center">
            <h3 className="text-xl font-semibold">Registrar Paciente</h3>
          </div>
            <FormularioRegistroPaciente/>
        </div>
      </div>    
    </main>
  )
}

export default RegistroPaciente