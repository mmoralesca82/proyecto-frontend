'use client'
import { useState } from "react"

import { useSession } from "next-auth/react"

import { RegistrarUsuario }  from '@/services/mssecurity'

const FormularioRegistroUsuario = () => {
  

  const { data: session } = useSession()


  const INITIAL_FORM = {
    username : '',
    password : '',
    email: '',
    telefono : '',
    roles : [''],
  }
  const [form, setForm] = useState(INITIAL_FORM)


  const handleRegister = async (event) => {
    event.preventDefault();

     

    const data = await RegistrarUsuario(session.user.token, form)

    window.alert(data?.message)

    setForm(INITIAL_FORM)
   

  } 

  const handleRole = (event) => {

    const rol = [event.target.value]

    setForm({...form, roles : rol})

    console.log()
  }

  return (
    <section>
      <div >
        <form
              className="flex flex-col gap-2"          
            >
            <div className="border p-4 border-cyan-500">
              <label className="font-bold text-sm">Username<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="newusername"
                onChange={event => setForm(prev => ({ ...prev, username: event.target.value }))}
                value={form.username}
              />
              <label className="font-bold text-sm">Password<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="password"
                placeholder="newpassword"
                onChange={event => setForm(prev => ({ ...prev, password: event.target.value }))}
                value={form.password}
              />
              <label className="font-bold text-sm">Email<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="email"
                placeholder="correo@corre.com"
                onChange={event => setForm(prev => ({ ...prev, email: event.target.value }))}
                value={form.email}
              />
              <label className="font-bold text-sm">Teléfono<span className="text-red-700  text-sm">  *</span></label>
              <input
                className="border p-1 shadow-md text-black w-full"
                type="text"
                placeholder="+51 999999999"
                onChange={event => setForm(prev => ({ ...prev, telefono: event.target.value }))}
                value={form.telefono}
              />
              <label className="font-bold text-sm">Seleccionar Rol<span className="text-red-700  text-sm">  *</span></label>
                    <select 
                        className="inputNumDoc border p-1 shadow-md text-black w-full"
                        onChange={handleRole}
                    >
                        <option value=''>Seleccionar</option>
                        <option value="SYSTEM">SYSTEM</option>
                        <option value="SYSTEM">ADMIN</option>
                        <option value="SYSTEM">USER</option>
                        <option value="SYSTEM">DOCTOR</option>
                        <option value="SYSTEM">NURSE</option>
                        <option value="SYSTEM">LAB</option>
                    </select>  
          </div>         
          </form>
  
        </div>

        

        <div>
          <button className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300 w-auto justify-center" onClick={handleRegister}>Registrar</button>
        </div>

        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
    </section>
    
  )
}

export default FormularioRegistroUsuario