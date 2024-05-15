'use client'

import { useState, useEffect } from "react"

import { ConsultarPaciente } from "@/services/msregistro"

import { useSession } from "next-auth/react"

import { ObtenerCitasMedicasConDoc , EliminarConsulta } from "@/services/msmedicina"

import { useRouter } from "next/navigation"

import Modal from 'react-modal'

const FormularioGestionConsulta = () => {

    const router = useRouter()

    const { data: session } = useSession()

    const [dataPaciente, setDataPaciente] = useState({})

    const [ numDocumento, setNumDocumento] = useState('')

    const [ listaCitasMedicas , setListaCitasMedicas ] = useState({})

    const [ deletAppointment, setDeletAppointment ] = useState({})

    const [ isHidden, setIsHidden ] = useState('hidden')

    const [isOpen, setIsOpen] = useState(false)

    const [ appointmentDetails , setAppointmentDetails ] = useState(false)

    const [ selectAppointment, setSelectAppointment ] = useState([])
    
    const tab = '\u00A0' 

    const [ idAppointment , setIdAppointment ] = useState('')

    const customStyles = {
      overlay: {
         backgroundColor: 'rgba(0, 0, 0, 0.6)'
      },
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)'
      }
   }


    const getCitas = async() => {
        setListaCitasMedicas(await ObtenerCitasMedicasConDoc(session.user?.token, dataPaciente?.data?.numDocumento))
    }

    useEffect(() => {
        if(dataPaciente?.code===302){
            if(dataPaciente?.data.estado){
                getCitas()
                setIsHidden('')
            }
            else{
                window.alert('PACIENTE DESHABILITADO. Comunicarse con Administración.')
                router.push('/dashboard/admision/gestion-consulta')
                return
            }           
        }
        else{
            setIsHidden('hidden')
        }
        if(dataPaciente?.message==="No se encontro la informacion.")
          window.alert(dataPaciente?.message)
    },[dataPaciente])

    const handleGetInfo = async (event) => {
        event.preventDefault()

        const regex = new RegExp('^[0-9]{8}$') // equivalente a '\d{8}'        
        
        if(!regex.test(numDocumento)){
            window.alert('Debe ingresar un número de documento válido.')
            return
        }        

        setDataPaciente(await ConsultarPaciente(session.user?.token, numDocumento))
              
        setNumDocumento('')
        
    }

    const wasFinished = (fechaTriaje) => {

        if(fechaTriaje === undefined)
            return false

        return true
    }

    const askForDelete = (event) => {
        event.preventDefault()
        setIdAppointment(event.target.dataset.id)
        setIsOpen(true)

      
    }

    useEffect(() => {
        if(idAppointment !== '')
             getCitas()

        setIdAppointment('')
    },[deletAppointment])

    const handleDelete = async () => {

        setIsOpen(false)

        setDeletAppointment(await EliminarConsulta(session.user?.token, idAppointment))

    }

    const handleShowAppointment = (event) => {
        event.preventDefault()

        setSelectAppointment(listaCitasMedicas.data.filter(
                appointment => appointment.idConsulta == event.target.dataset.id
            )[0])

     
        setAppointmentDetails(true)
    }
    
 return (
    <>
        <section className="grid xl:grid-cols-3 lg:grid-cols-2">
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
            <div className={`${isHidden} p-4`}>
                    <h3 className="font-bold text-sm">Número Documento<span className="text-red-700  text-sm">  *</span></h3>
                    <p>{`${tab} ${tab} ${dataPaciente?.data?.numDocumento}`}</p>

                    <h3 className="font-bold text-sm">Nombre Paciente<span className="text-red-700  text-sm">  *</span></h3>
                    <p>{`${tab} ${tab} ${dataPaciente?.data?.nombre} ${dataPaciente?.data?.apellido}`}</p>

                   <p>{`📞 ${dataPaciente?.data?.telefono}`}</p>
            </div >
            <div className={`${isHidden} p-4`}>
                    <h3 className="font-bold text-sm">Contactos<span className="text-red-700  text-sm">  *</span></h3>
                    {dataPaciente.data?.contactoEmergencia?.map(contacto => {
                      return(
                        <p
                          key={contacto.idContactoEmerg}
                        >
                           {`${tab} ${tab} ${contacto.nombre} ${contacto.apellidoPaterno} ${contacto.apellidoMaterno} 
                            ${tab} ${tab} 📞 ${contacto.telefono}`} 
           
                        </p>
                      )
                    })}
                
            </div>
        </section>

        {/* my-8 text-lg bg-sky-700 text-white text-center rounded-md w-36  hover:bg-slate-500 */}
        <section className={`${isHidden} border p-4 border-cyan-500 rounded-xl w-[700px] mx-auto`}>
                    
            {listaCitasMedicas?.data?.map(cita =>{
                return(
                    <div 
                        className="my-2"
                        key={cita.idConsulta}
                    >
                        <button
                            className={`${wasFinished(cita.triaje.fechaTriaje)?'hidden':''} bg-sky-700 hover:bg-slate-500 text-white  cursor-pointer rounded-md`}
                            data-id={cita.idConsulta}
                            onClick={askForDelete}>Eliminar
                        </button> 
                        <button
                            className={`${wasFinished(cita.triaje.fechaTriaje)?'':'hidden'} text-red-600`}
                            data-id={cita.idConsulta}
                            onClick={handleShowAppointment}>Atendido
                        </button> 
                        <span className="mx-5">{`Cita: ${cita.fechaConsulta.split('T')[0].split('-').reverse().join('/')} 
                            ${cita.fechaConsulta.split('T')[1].split('.')[0]}`}
                            <div className="mx-28">
                                {`DOCTOR: ${cita.doctor}`}
                            </div>                             
                        </span>
                    </div>
                    
                )
                
            })
            }

            <div>
                <Modal 
                    ariaHideApp={false}
                    isOpen={isOpen} 
                    onRequestClose={() => setIsOpen(false)} 
                    style={customStyles}>
                    <h1 className="text-lg">⚠️ ¿DESEA ELIMINAR LA CITA?</h1>
                    <div className="my-6 grid grid-cols-2">
                        <button 
                            className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-32 mx-1 h-12"
                            onClick={() => setIsOpen(false)}
                            >Cancelar</button>
                        <button 
                            className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-32 mx-1 h-12"
                            onClick={handleDelete}
                            >Eliminar</button>                            
                    </div>
                    
                </Modal>

                <Modal 
                    ariaHideApp={false}
                    isOpen={appointmentDetails} 
                    selectAppointment={selectAppointment}
                    onRequestClose={() => setAppointmentDetails(false)} 
                    style={customStyles}>
                    <h1 className="text-lg mx-24 mb-4">DETALLE DE LA CONSULTA</h1>
                    <section className="w-96">
                        <div>
                            <div className="mx-5 mb-1 ">{`Cita: ${selectAppointment?.fechaConsulta?.split('T')[0].split('-').reverse().join('/')} 
                                ${selectAppointment?.fechaConsulta?.split('T')[1].split('.')[0]}`}
                            </div>
                            <div className="mx-5 mb-1">
                              {`Doctor: ${selectAppointment?.doctor}`}
                            </div>     
                            <div className="mx-5 mb-1">
                              {`Sintomas: ${selectAppointment?.sintomas}`}
                            </div>
                            <div className="mx-5 mb-1">
                              {`Diagnóstico: ${selectAppointment?.diagnostico}`}
                            </div>  
                            <div className="mx-5 mb-1">
                              {`Tratamiento: ${selectAppointment?.tratamiento}`}
                            </div>  
                            <div className="mx-5 mb-1">
                              {`Notas médicas: ${selectAppointment?.notasMedicas}`}
                            </div>  
                            <div className="mx-5 mb-1">
                              {`Nombre de Seguro: ${selectAppointment?.nombreSeguro}`}
                            </div>  
                            <div className="mx-5 mb-1">
                              {`Cobertura de Seguro: ${selectAppointment?.coberturaSeguro}`}
                            </div>  
                            <section>
                                <h3 className="mx-5 mb-1">Triaje</h3>
                                <div className="mx-9">
                                    {`Temperatura: ${selectAppointment?.triaje?.tempCorporal}`}
                                </div> 
                                <div className="mx-9">
                                    {`Presión: ${selectAppointment?.triaje?.presionArterial}`}
                                </div> 
                                <div className="mx-9">
                                    {`Saturación: ${selectAppointment?.triaje?.satOxigeno}`}
                                </div> 
                                <div className="mx-9">
                                    {`Síntomas: ${selectAppointment?.triaje?.sintoma}`}
                                </div> 
                                <div className="mx-9">
                                    {`Observaciones: ${selectAppointment?.triaje?.observaciones}`}
                                </div> 
                            </section>
                            <section>
                                <h3 className="mx-5 mb-1">Procedimientos</h3>
                                {selectAppointment?.procedimientos?.map( procedimiento => {
                                    return (
                                        <div className="mb-2"
                                            key={procedimiento.idProcMedico}>
                                            <div className="mx-9">
                                               {`Tipo: ${procedimiento?.tipoProcedimiento}`}
                                            </div> 
                                            <div className="mx-9 mb-1">
                                               {`Nota: ${procedimiento?.notasProcedimiento}`}
                                            </div> 

                                        </div>
                                    )
                                }
                                )

                                }
                            </section>
                        </div>
          
                    </section>
                    <button 
                        className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-full mx-1 h-12"
                        onClick={() => setAppointmentDetails(false)}
                        >Cerrar
                    </button>
                </Modal>
            </div>
        </section>

       
    </>
                    
  )
}

export default FormularioGestionConsulta