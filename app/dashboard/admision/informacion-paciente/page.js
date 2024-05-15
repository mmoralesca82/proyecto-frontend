'use client'

import { useEffect, useState } from "react"

import { ConsultarPaciente } from '@/services/msregistro'

import { useSession } from "next-auth/react"

import { useRouter } from "next/navigation"


const InformaciónPaciente = () => {

    const {data: session } = useSession()

    const router = useRouter()

    const [ numDocumento, setNumDocumento ] = useState('')

    const [data, setData] = useState({})

    const [ isHidden, setIsHidden ] = useState('hidden')

    const tab = '\u00A0'

    useEffect(() => {
        if(data?.code===302){
            if(data?.data.estado)
              setIsHidden('')
            else{
              window.alert('PACIENTE DESHABILITADO. Comunicarse con Administración.')
              router.push('/dashboard/admision/informacion-paciente')
              return
            }
        }else{
            setIsHidden('hidden')            
        }
        if(data?.message==="No se encontro la informacion.")
          window.alert(data?.message)
    },[data])

    const handleGetInfo = async (event) => {
        event.preventDefault()

        const regex = new RegExp('^[0-9]{8}$') // equivalente a '\d{8}'        
        
        if(!regex.test(numDocumento)){
            window.alert('Debe ingresar un número de documento válido.')
            return
        }        

        
        setData(await ConsultarPaciente(session.user?.token, numDocumento))
              
        setNumDocumento('')
        
    }

    const handleUpdate = () => {

      router.push(`/dashboard/admision/actualizacion-paciente?documento=${data.data?.numDocumento}`)
    }

    return (
        <main className='container m-auto p-6 pt-10 mx-60'>
          <div className="mx-auto flex w-auto flex-col justify-center p-16">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1 text-center">
                <h3 className="text-xl font-semibold">Información de paciente</h3>
              </div>
                <form
                    className="flex flex-col gap-2 w-80 border p-4 border-cyan-500 rounded-2xl"
                    onSubmit={handleGetInfo}
                    >
                    <div className=" flex">
                        <label className="font-bold text-sm">Número Documento<span className="text-red-700  text-sm">  *</span></label>
                        <input
                            className="inputNumDoc border p-1 shadow-md text-black w-full"
                            type="text"
                            placeholder="documento"
                            onChange={event => setNumDocumento(event.target.value)}
                            value={numDocumento}
                        />                        
                    </div>
                    <input 
                            className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-32 justify-normal"
                            type="submit"
                            value="Consultar"
                        />
                </form>
            </div>
          </div>   

          <div className={`${isHidden} border p-4 border-cyan-500 rounded-xl w-96 mx-auto `}>

            <ul>
              <li><span className="text-sky-700 font-semibold py-8">PACIENTE: 
                </span>{`${tab} ${tab} ${data.data?.nombre} ${data.data?.apellido}`}</li>
              <li><span className="text-sky-700 font-semibold py-8">DOCUMENTO: 
                </span>{`${tab} ${tab}  ${data.data?.numDocumento}`}</li>
              <li><span className="text-sky-700 font-semibold py-8">FECHA NACIMIENTO: 
                </span>{`${tab} ${tab} ${data.data?.fechaNacimiento.split('T')[0].split('-').reverse().join('/')}`}</li>
              <li><span className="text-sky-700 font-semibold py-8">GENERO: 
                </span>{`${tab} ${tab}  ${data.data?.genero}`}</li>
              <li><span className="text-sky-700 font-semibold py-8">TELEFONO: 
                </span>{`${tab} ${tab}  ${data.data?.telefono}`}</li>
              <li><span className="text-sky-700 font-semibold py-8">DIRECCIÓN: </span>
                  <ul>
                      <li><span className="text-sky-700 font-semibold py-8">{`${tab} ${tab} Vía:`}
                        </span>{`${tab} ${tab}  ${data.data?.direccion?.via} ${data.data?.direccion?.numeroPredio}`}</li>
                      <li><span className="text-sky-700 font-semibold py-8">{`${tab} ${tab} Interior:`}
                        </span>{`${tab} ${tab}  ${data.data?.direccion?.interior}`}</li>
                      <li><span className="text-sky-700 font-semibold py-8">{`${tab} ${tab} Referencia:`}
                        </span>{`${tab} ${tab}  ${data.data?.direccion?.referencia}`}</li>
                      <li><span className="text-sky-700 font-semibold py-8">{`${tab} ${tab} Distrito:`}
                        </span>{`${tab} ${tab}  ${data.data?.direccion?.distrito}`}</li>
                      <li><span className="text-sky-700 font-semibold py-8">{`${tab} ${tab} Provincia:`}
                        </span>{`${tab} ${tab}  ${data.data?.direccion?.provincia}`}</li>
                      <li><span className="text-sky-700 font-semibold py-8">{`${tab} ${tab} Departamento:`}
                        </span>{`${tab} ${tab}  ${data.data?.direccion?.departamento}`}</li>
                  </ul>
              </li>

             <div className="container justify-center">
                <table className="table-auto border-collapse	border border-cyan-500">
                  <caption className="caption-top text-sky-700 font-semibold pt-7">
                    CONTACTOS
                  </caption>
                  <thead >
                    <tr>
                      <th className="border-separate	border border-cyan-500 text-sky-700">Nombre</th>
                      <th className="border-separate	border border-cyan-500 text-sky-700">Teléfono</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data?.contactoEmergencia?.map(contacto => {
                      return(
                        <tr 
                          key={contacto.idContactoEmerg}
                        >
                          <td className="border-separate	border border-cyan-500 text-sky-700">{`${contacto.nombre} ${contacto.apellidoPaterno} ${contacto.apellidoMaterno}`}</td>
                          <td className="border-separate	border border-cyan-500 text-sky-700">{`${contacto.telefono}`}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                
              </div>
              <div className="mt-6 ">
                  <button className="content-centerborder p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-auto" onClick={handleUpdate}>Actualizar</button>
              </div>
              

            </ul>            
         
          </div>          

        </main>
      )
    }

export default InformaciónPaciente