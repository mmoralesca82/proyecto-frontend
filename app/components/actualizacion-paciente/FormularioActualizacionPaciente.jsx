'use client'
import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import { useSession } from "next-auth/react"

import { ActualizarPaciente }  from '@/services/msregistro'

import { ConsultarPaciente } from "@/services/msregistro"

const FormularioActualizacionPaciente = ({documento}) => {

  const { data: session } = useSession()

  const [ data, setData ] = useState() // info de la DB

  const tab = '\u00A0'


  const INITIAL_CONTACT_FORM = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: ''
  }
  const [contacto1, setContacto1] = useState(INITIAL_CONTACT_FORM)
  const [contacto2, setContacto2] = useState(INITIAL_CONTACT_FORM)
  const [contacto3, setContacto3] = useState(INITIAL_CONTACT_FORM)

  const INITIAL_ADDRESS_FORM = {
    via : '',
    numeroPredio : '' ,
    interior : '',
    referencia : '' ,
    distrito :  '',
    provincia: '',
    departamento : ''
  }
  const [direccion, setDireccion] = useState(INITIAL_ADDRESS_FORM)

  const INITIAL_FORM = {
    numDocumento : '',
    fechaNacimiento : '',
    genero : '',
    telefono : '',
  }
  const [form, setForm] = useState(INITIAL_FORM)

  const getData = async () => {
    setData( await ConsultarPaciente(session.user?.token, documento))
  }

  useEffect(() => {
    getData()
  },[])

  useEffect(() => {

   setForm({ ...form, 
      numDocumento : data?.data?.numDocumento,
      fechaNacimiento : data?.data?.fechaNacimiento.split('T')[0],
      genero : data?.data?.genero,
      telefono : data?.data?.telefono
    })

      setDireccion({ ...direccion, 
      via : data?.data?.direccion.via,
      numeroPredio : data?.data?.direccion.numeroPredio,
      interior : data?.data?.direccion.interior,
      referencia : data?.data?.direccion.referencia,
      distrito :  data?.data?.direccion.distrito,
      provincia: data?.data?.direccion.provincia,
      departamento : data?.data?.direccion.departamento      
  })

      if(data?.data.contactoEmergencia.length>0){
        let numContacto=1;
        data?.data.contactoEmergencia.map(contacto =>{
          switch(numContacto){
            case 1:
              setContacto1({ ...contacto1,
                nombre: contacto.nombre,
                apellidoPaterno: contacto.apellidoPaterno,
                apellidoMaterno: contacto.apellidoMaterno,
                telefono: contacto.telefono
              })
            break;
            case 2:
              setContacto2({ ...contacto2,
                nombre: contacto.nombre,
                apellidoPaterno: contacto.apellidoPaterno,
                apellidoMaterno: contacto.apellidoMaterno,
                telefono: contacto.telefono
              })
            break;            
            case 3:
              setContacto3({ ...contacto3,
                nombre: contacto.nombre,
                apellidoPaterno: contacto.apellidoPaterno,
                apellidoMaterno: contacto.apellidoMaterno,
                telefono: contacto.telefono
              })
            break;     
           }
           numContacto = numContacto + 1
        })
      }
   }, [data])

  const router = useRouter() 

  

  const handleUpdate = async (event) => {
    event.preventDefault();
    
    let contactos = []

    if(contacto1.nombre!='')contactos.push(contacto1)
    if(contacto2.nombre!='')contactos.push(contacto2)
    if(contacto3.nombre!='')contactos.push(contacto3)
   
    const data = await ActualizarPaciente(session.user.token, {...form, contactos, direccion})
    
    window.alert(data?.message)
    
     router.push('/dashboard/admision/informacion-paciente')
  } 

  const handleDeleteContact1 = (event) => {
    event.preventDefault()
    setContacto1(INITIAL_CONTACT_FORM)
  }

  const handleDeleteContact2 = (event) => {
    event.preventDefault()
    setContacto2(INITIAL_CONTACT_FORM)
  }

  const handleDeleteContact3 = (event) => {
    event.preventDefault()
    setContacto3(INITIAL_CONTACT_FORM)
  }

  return (
    <section>      
      <div >
        <form
              className="flex flex-col gap-2"
            >
            <div className="border p-4 border-cyan-500">
              <label className="font-bold text-sm">Número Documento<span className="text-red-700  text-sm">  *</span></label>
              <p>{`${tab} ${tab} ${data?.data.numDocumento}`}</p>

              <label className="font-bold text-sm">Nombre Paciente<span className="text-red-700  text-sm">  *</span></label>
              <p>{`${tab} ${tab} ${data?.data.nombre} ${data?.data.apellido}`}</p>

              <label className="font-bold text-sm">Fecha de Nacimiento<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="date"
                required pattern="\d{2}/\d{2}/\d{4}"
                onChange={event => setForm(prev => ({ ...prev, fechaNacimiento: event.target.value }))}
                value={form.fechaNacimiento || ''}
              />
              <label className="font-bold text-sm">Género<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="masculino/femenino"
                onChange={event => setForm(prev => ({ ...prev, genero: event.target.value }))}
                value={form.genero || ''}
              />
              <label className="font-bold text-sm">Teléfono<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="+51 999999999"
                onChange={event => setForm(prev => ({ ...prev, telefono: event.target.value }))}
                value={form.telefono || ''}
              />
          </div>
          <div className="border p-4 border-cyan-500">
              <h4 className="underline">Dirección</h4>
              <label className="font-bold text-sm">Vía<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="Av. Holguín"
                onChange={event => setDireccion(prev => ({ ...prev, via: event.target.value }))}
                value={direccion.via || ''}
              />
              <label className="font-bold text-sm">Número de predio<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="788"
                onChange={event => setDireccion(prev => ({ ...prev, numeroPredio: event.target.value }))}
                value={direccion.numeroPredio || ''}
              />
              <label className="font-bold text-sm">Interior</label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="Dpto 100"
                onChange={event => setDireccion(prev => ({ ...prev, interior: event.target.value }))}
                value={direccion.interior || ''}
              />
              <label className="font-bold text-sm">Referencia</label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="A una cuadra de ..."
                onChange={event => setDireccion(prev => ({ ...prev, referencia: event.target.value }))}
                value={direccion.referencia || ''}
              />
              <label className="font-bold text-sm">Distrito<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="Lima"
                onChange={event => setDireccion(prev => ({ ...prev, distrito: event.target.value }))}
                value={direccion.distrito || ''}
              />
              <label className="font-bold text-sm">Provincia<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="Lima"
                onChange={event => setDireccion(prev => ({ ...prev, provincia: event.target.value }))}
                value={direccion.provincia || ''}
              />
              <label className="font-bold text-sm">Departamento<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="Lima"
                onChange={event => setDireccion(prev => ({ ...prev, departamento: event.target.value }))}
                value={direccion.departamento || ''}
              />
           </div>
          </form>
  
        </div>

        <div className="border p-4 border-cyan-500 mt-2">
          <h4 className="underline">Contactos</h4>
          <section className=" ms-3 grid grid-cols-3 w-full">
            <div className="border p-4 border-cyan-500 grid grid-cols-2 mx-1">
                <label className="font-bold text-sm">Nombres</label>
                <input 
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="nombres"
                  onChange={event => setContacto1(prev => ({ ...prev, nombre: event.target.value }))}
                  value={contacto1.nombre || ''}
                />
                <label className="font-bold text-sm">Apellido Paterno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido paterno"
                  onChange={event => setContacto1(prev => ({ ...prev, apellidoPaterno: event.target.value }))}
                  value={contacto1.apellidoPaterno || ''}
                />
                <label className="font-bold text-sm">Apellido Materno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido materno"
                  onChange={event => setContacto1(prev => ({ ...prev, apellidoMaterno: event.target.value }))}
                  value={contacto1.apellidoMaterno || ''}
                />
                <label className="font-bold text-sm">Teléfono</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="teléfono"
                  onChange={event => setContacto1(prev => ({ ...prev, telefono: event.target.value }))}
                  value={contacto1.telefono || ''}
                />    

                <button 
                  className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-auto lg:w-20 " 
                  onClick={handleDeleteContact1}>Borrar</button>
            </div>

            <div className="border p-4 border-cyan-500 grid grid-cols-2 mx-1">
                <label className="font-bold text-sm">Nombres</label>
                <input 
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="nombres"
                  onChange={event => setContacto2(prev => ({ ...prev, nombre: event.target.value }))}
                  value={contacto2.nombre || ''}
                />
                <label className="font-bold text-sm">Apellido Paterno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido paterno"
                  onChange={event => setContacto2(prev => ({ ...prev, apellidoPaterno: event.target.value }))}
                  value={contacto2.apellidoPaterno || ''}
                />
                <label className="font-bold text-sm">Apellido Materno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido materno"
                  onChange={event => setContacto2(prev => ({ ...prev, apellidoMaterno: event.target.value }))}
                  value={contacto2.apellidoMaterno || ''}
                />
                <label className="font-bold text-sm">Teléfono</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="teléfono"
                  onChange={event => setContacto2(prev => ({ ...prev, telefono: event.target.value }))}
                  value={contacto2.telefono || ''}
                />       
                <button 
                  className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-auto lg:w-20 " 
                  onClick={handleDeleteContact2}>Borrar</button>       
            </div>

            <div className="border p-4 border-cyan-500 grid grid-cols-2 mx-1">
                <label className="font-bold text-sm">Nombres</label>
                <input 
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="nombres"
                  onChange={event => setContacto3(prev => ({ ...prev, nombre: event.target.value }))}
                  value={contacto3.nombre || ''}
                />
                <label className="font-bold text-sm">Apellido Paterno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido paterno"
                  onChange={event => setContacto3(prev => ({ ...prev, apellidoPaterno: event.target.value }))}
                  value={contacto3.apellidoPaterno || ''}
                />
                <label className="font-bold text-sm">Apellido Materno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido materno"
                  onChange={event => setContacto3(prev => ({ ...prev, apellidoMaterno: event.target.value }))}
                  value={contacto3.apellidoMaterno || ''}
                />
                <label className="font-bold text-sm">Teléfono</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="teléfono"
                  onChange={event => setContacto3(prev => ({ ...prev, telefono: event.target.value }))}
                  value={contacto3.telefono || ''}
                />              
                <button 
                  className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-auto lg:w-20 " 
                  onClick={handleDeleteContact3}>Borrar</button>
            </div>
          </section>
        </div>   

        <div>
          <button className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-auto justify-center" onClick={handleUpdate}>Actualizar</button>
        </div>

        {/* <pre>{JSON.stringify(form, null, 2)}</pre>
        <pre>{JSON.stringify(direccion, null, 2)}</pre>
        <pre>{JSON.stringify(contacto1, null, 2)}</pre>
        <pre>{JSON.stringify(contacto2, null, 2)}</pre>
        <pre>{JSON.stringify(contacto3, null, 2)}</pre> */}
    </section>
    
  )
}

export default FormularioActualizacionPaciente