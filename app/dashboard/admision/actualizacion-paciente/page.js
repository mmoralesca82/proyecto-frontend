'use client'

import { useSearchParams } from 'next/navigation'
import FormularioActualizacionPaciente from '@/app/components/actualizacion-paciente/FormularioActualizacionPaciente'
import { Suspense } from 'react'


const ActualizacionPaciente = () => {
  
    const searchParams = useSearchParams()

    const documento = searchParams.get('documento')    

  return (
    <main className='container m-auto p-6 pt-10 mx-60'>
          <div className="mx-auto flex w-auto flex-col justify-center p-16">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1 text-center">
                <h3 className="text-xl font-semibold">Actualización de paciente</h3>
              </div>
              <Suspense>
                  <FormularioActualizacionPaciente 
                      documento={documento}
                  />
              </Suspense>
                
              </div>
          </div>   
    </main>

    
  )
}

export default ActualizacionPaciente