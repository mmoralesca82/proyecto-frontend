'use client'

import { useState, useEffect } from "react"

import { ConsultarPaciente, ObtenerEspecialidades, ObtenerDoctores } from "@/services/msregistro"

import { useSession } from "next-auth/react"

import { RegistrarConsulta } from "@/services/msmedicina"

import { useRouter } from "next/navigation"

const FormularioRegistroConsulta = () => {

    const router = useRouter()

    const [dataPaciente, setDataPaciente] = useState({})

    const [ especialidades, setEspecialidades ] = useState([])

    const [ doctores, setDoctores ] = useState([])

    const [ numDocumento, setNumDocumento] = useState('')

    const [ isHidden, setIsHidden ] = useState('hidden')

    const [ isHiddenDoctor , setIsHiddenDoctor ] = useState('hidden')

    const [ isHiddenDateAppointment, setIsHiddenDateAppointment ] = useState('hidden')

    const [ especialidadSeleccionada, setEspecialidadSeleccionada ] = useState('')

    const [ filteredDoctors, setFilteredDoctors ] = useState([])

    const { data:session } = useSession()

    const tab = '\u00A0'

    const INITIAL_FORM = {
        fechaConsulta : '--/--/---- --:--',     //"24/03/2024 14:50",
        idDoctor : '',
        idPaciente : ''
    }

    const [ form , setForm] = useState(INITIAL_FORM)

    useEffect(() =>{
        getInfo()
    },[])

    const getInfo = async () =>{
        setEspecialidades(await ObtenerEspecialidades(session.user?.token))
        setDoctores(await ObtenerDoctores(session.user?.token))
    }

     useEffect(() => {
        if(dataPaciente?.code===302){
            if(dataPaciente?.data.estado){
                setForm({...form, idPaciente: dataPaciente?.data?.idPaciente})
                setIsHidden('')
            }
            else{
                window.alert('PACIENTE DESHABILITADO. Comunicarse con Administración.')
                router.push('/dashboard/admision/registro-consulta')
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

    useEffect(() =>{
        if(especialidadSeleccionada !== '')
            setIsHiddenDoctor('')
    },[filteredDoctors])

    const handleGetDoctors = async (event) => {
        event.preventDefault()
        setForm({...form, fechaConsulta:'', idDoctor:''})

        if(especialidadSeleccionada === ''){
            window.alert('Debe seleccionar una especialidad.')
            return
        }  
        
        const newDoctorList = ([])
            
        doctores.data.map(doctor =>{
            if(doctor.especialidad === especialidadSeleccionada)
                newDoctorList.push(doctor)
            })

        setFilteredDoctors(newDoctorList)
    }

    const handleDateAppointment = (event) =>{
        event.preventDefault()

        if(form.idDoctor === ''){
            window.alert('Debe seleccionar un doctor.')
            setIsHiddenDateAppointment('hidden')
            return
        }

        setIsHiddenDateAppointment('')
    }

    const handleAppointmentRegister = async (event) =>{
        event.preventDefault()

        if(form.fechaConsulta.split(' ')[0]==='--/--/----'){
            window.alert('Se requiere fecha de cita.')
            return
        }
        if(form.fechaConsulta.split(' ')[1]==='--:--'){
            window.alert('Se requiere hora de cita')
            return
        }

        const data = await RegistrarConsulta(session.user.token, form)

        window.alert(data?.message)

        router.push('/dashboard/admision')
       
    }

    const handleDate = (event) => {
        const saveTime = form.fechaConsulta.split(' ')[1]
        setForm(({ ...form, fechaConsulta: event.target.value.split('-').reverse().join('/') + ' ' + saveTime}))
    }

    const handleTime = (event) => {
        const saveDate = form.fechaConsulta.split(' ')[0]
        setForm(({ ...form, fechaConsulta: saveDate + ' ' + event.target.value}))
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

        <section className={`${isHidden} my-6 grid xl:grid-cols-3 lg:grid-cols-2`}>
            
            <div></div>

            <form
                className="flex flex-col gap-2 border w-80 p-4"
                onSubmit={handleGetDoctors}
                >
                <div className=" flex">
                    <label className="font-bold text-sm">Seleccione especialidad<span className="text-red-700  text-sm">  *</span></label>
                    <select 
                        className="inputNumDoc border p-1 shadow-md text-black w-full"
                        onChange={event => setEspecialidadSeleccionada(event.target.value)}
                            
                    >
                        <option value=''>Seleccionar</option>
                        {especialidades?.data?.map(especialidad =>{
                            return(
                                <option key={especialidad.idEspecialidad} value={especialidad.especialidad}>{especialidad.especialidad}</option>
                            )
                        })}
                    </select>                        
                </div>
                <input 
                        className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-32 justify-normal"
                        type="submit"
                        value="Consultar"
                />            
            </form>

            <form
                className={`${isHiddenDoctor} flex flex-col gap-2 border w-80 p-4`}
                onSubmit={handleDateAppointment}
                >
                <div className=" flex">
                    <label className="font-bold text-sm">Seleccione  doctor<span className="text-red-700  text-sm">  *</span></label>
                    <select 
                        className="inputNumDoc border p-1 shadow-md text-black w-full"
                        onChange={event => setForm({...form, idDoctor: event.target.value, fechaConsulta: '--/--/---- --:--'})}
                    >
                        <option value=''>Seleccionar</option>
                        {filteredDoctors?.map(doctor =>{
                            return(
                                <option key={doctor.idDoctor} value={doctor.idDoctor}>{doctor.nombre} {doctor.apellido}</option>
                            )
                        })}
                    </select>                        
                </div>
                <input 
                        className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-32 justify-normal"
                        type="submit"
                        value="Consultar"
                />            
            </form>  
        
        </section>

         <section className={`${isHiddenDateAppointment} my-6 grid xl:grid-cols-3 lg:grid-cols-2`}>

            <div></div>

            <div>
            
                <label className="font-bold text-sm">Fecha de cita<span className="text-red-700  text-sm">  *</span></label>
                <input
                    className="border p-1 shadow-md text-black w-40"
                    type="date"
                    required pattern="\d{2}/\d{2}/\d{4}"
                    onChange={handleDate}
                    
                />
            </div>
            <div>
                <label className="font-bold text-sm">Hora de cita<span className="text-red-700  text-sm">  *</span></label>
                <input
                    className="border p-1 shadow-md text-black w-40"
                    type="time"
                    placeholder=""
                    onChange={handleTime}
                />
              </div>
        
        </section>
        <section className={`${isHiddenDateAppointment} my-6 grid xl:grid-cols-2 lg:grid-cols-2`}>
               <div></div>
               {/* <div></div> */}
               <div>
                    <button 
                    className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-auto     justify-center" onClick={handleAppointmentRegister}>Registrar cita</button>
                </div>
        </section>
    </>
                    
  )
}

export default FormularioRegistroConsulta