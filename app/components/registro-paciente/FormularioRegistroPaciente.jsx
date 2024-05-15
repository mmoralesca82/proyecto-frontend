'use client'
import { useState } from "react"

import { useSession } from "next-auth/react"

import { RegistrarPaciente }  from '@/services/msregistro'

const FormularioRegistroPaciente = () => {
  

  const { data: session } = useSession()

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

  let contactos = []



  const handleRegister = async (event) => {
    event.preventDefault();

    
    if(contacto1.nombre!='')contactos.push(contacto1)
    if(contacto2.nombre!='')contactos.push(contacto2)
    if(contacto3.nombre!='')contactos.push(contacto3)
   

    const data = await RegistrarPaciente(session.user.token, {...form, contactos, direccion})

    
    window.alert(data?.message)

    setContacto1(INITIAL_CONTACT_FORM)
    setContacto2(INITIAL_CONTACT_FORM)
    setContacto3(INITIAL_CONTACT_FORM)
    setDireccion(INITIAL_ADDRESS_FORM)
    setForm(INITIAL_FORM)     
    
    // DONE: Redirección a la ruta /dashboard

    // router.push('/dashboard')
  } 

  return (
    <section>
      <div >
        <form
              className="flex flex-col gap-2"          
            >
            <div className="border p-4 border-cyan-500">
              <label className="font-bold text-sm">Número Documento<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="documento"
                onChange={event => setForm(prev => ({ ...prev, numDocumento: event.target.value }))}
                value={form.numDocumento}
              />
              <label className="font-bold text-sm">Fecha de Nacimiento<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="date"
                required pattern="\d{2}/\d{2}/\d{4}"
                onChange={event => setForm(prev => ({ ...prev, fechaNacimiento: event.target.value }))}
                value={form.fechaNacimiento}
              />
              <label className="font-bold text-sm">Género<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="masculino/femenino"
                onChange={event => setForm(prev => ({ ...prev, genero: event.target.value }))}
                value={form.genero}
              />
              <label className="font-bold text-sm">Teléfono<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="+51 999999999"
                onChange={event => setForm(prev => ({ ...prev, telefono: event.target.value }))}
                value={form.telefono}
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
                value={direccion.via}
              />
              <label className="font-bold text-sm">Número de predio<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="788"
                onChange={event => setDireccion(prev => ({ ...prev, numeroPredio: event.target.value }))}
                value={direccion.numeroPredio}
              />
              <label className="font-bold text-sm">Interior</label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="Dpto 100"
                onChange={event => setDireccion(prev => ({ ...prev, interior: event.target.value }))}
                value={direccion.interior}
              />
              <label className="font-bold text-sm">Referencia</label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="A una cuadra de ..."
                onChange={event => setDireccion(prev => ({ ...prev, referencia: event.target.value }))}
                value={direccion.referencia}
              />
              <label className="font-bold text-sm">Distrito<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="Lima"
                onChange={event => setDireccion(prev => ({ ...prev, distrito: event.target.value }))}
                value={direccion.distrito}
              />
              <label className="font-bold text-sm">Provincia<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="Lima"
                onChange={event => setDireccion(prev => ({ ...prev, provincia: event.target.value }))}
                value={direccion.provincia}
              />
              <label className="font-bold text-sm">Departamento<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="Lima"
                onChange={event => setDireccion(prev => ({ ...prev, departamento: event.target.value }))}
                value={direccion.departamento}
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
                  value={contacto1.nombre}
                />
                <label className="font-bold text-sm">Apellido Paterno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido paterno"
                  onChange={event => setContacto1(prev => ({ ...prev, apellidoPaterno: event.target.value }))}
                  value={contacto1.apellidoPaterno}
                />
                <label className="font-bold text-sm">Apellido Materno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido materno"
                  onChange={event => setContacto1(prev => ({ ...prev, apellidoMaterno: event.target.value }))}
                  value={contacto1.apellidoMaterno}
                />
                <label className="font-bold text-sm">Teléfono</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="teléfono"
                  onChange={event => setContacto1(prev => ({ ...prev, telefono: event.target.value }))}
                  value={contacto1.telefono}
                />              
            </div>

            <div className="border p-4 border-cyan-500 grid grid-cols-2 mx-1">
                <label className="font-bold text-sm">Nombres</label>
                <input 
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="nombres"
                  onChange={event => setContacto2(prev => ({ ...prev, nombre: event.target.value }))}
                  value={contacto2.nombre}
                />
                <label className="font-bold text-sm">Apellido Paterno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido paterno"
                  onChange={event => setContacto2(prev => ({ ...prev, apellidoPaterno: event.target.value }))}
                  value={contacto2.apellidoPaterno}
                />
                <label className="font-bold text-sm">Apellido Materno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido materno"
                  onChange={event => setContacto2(prev => ({ ...prev, apellidoMaterno: event.target.value }))}
                  value={contacto2.apellidoMaterno}
                />
                <label className="font-bold text-sm">Teléfono</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="teléfono"
                  onChange={event => setContacto2(prev => ({ ...prev, telefono: event.target.value }))}
                  value={contacto2.telefono}
                />              
            </div>

            <div className="border p-4 border-cyan-500 grid grid-cols-2 mx-1">
                <label className="font-bold text-sm">Nombres</label>
                <input 
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="nombres"
                  onChange={event => setContacto3(prev => ({ ...prev, nombre: event.target.value }))}
                  value={contacto3.nombre}
                />
                <label className="font-bold text-sm">Apellido Paterno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido paterno"
                  onChange={event => setContacto3(prev => ({ ...prev, apellidoPaterno: event.target.value }))}
                  value={contacto3.apellidoPaterno}
                />
                <label className="font-bold text-sm">Apellido Materno</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="apellido materno"
                  onChange={event => setContacto3(prev => ({ ...prev, apellidoMaterno: event.target.value }))}
                  value={contacto3.apellidoMaterno}
                />
                <label className="font-bold text-sm">Teléfono</label>
                <input
                  className="border p-1 shadow-md text-black w-full"
                  type="text"
                  placeholder="teléfono"
                  onChange={event => setContacto3(prev => ({ ...prev, telefono: event.target.value }))}
                  value={contacto3.telefono}
                />              
            </div>
          </section>
        </div>   

        <div>
          <button className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-auto justify-center" onClick={handleRegister}>Registrar</button>
        </div>

        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
    </section>
    
  )
}

export default FormularioRegistroPaciente