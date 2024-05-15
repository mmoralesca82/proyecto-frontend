'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { restorePassword } from "@/services/mssecurity"


import Link from "next/link"

const RestorePage = () => {
  
  const [form, setForm] = useState(
    {
      username: '',
      token : '',
      newPassword : ''
  })

  const [verifyPassword, SetVerifyPassword] = useState('')

  const router = useRouter()
  
  const handleRestore = async (event) => {
    event.preventDefault()

    if(form.newPassword!==verifyPassword){
      window.alert('Password no coinciden')
      setForm({...form, newPassword: ''})
      SetVerifyPassword('')
      return
    }

    const data = await restorePassword(form)  

    window.alert(data.message)

    router.push('/')
  }

  return (
    <main className="container w-[400px] h-screen mx-auto space-y-4 flex flex-col justify-center">
      <div className="mx-auto flex w-full flex-col justify-center p-8">
        
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Restaurar contraseña</h1>
            {/* <p className="text-sm text-slate-600">Ingrese usuario.</p> */}
          </div>    
            <div >
                <form
                  className="flex flex-col gap-2"
                  onSubmit={handleRestore}
                >
                  <label className="font-bold">Usuario</label>
                  <input
                    className="border p-3 shadow-sm text-black"
                    type="text"
                    placeholder="youruser"
                    onChange={event => setForm(prev => ({...prev, username: event.target.value}))}
                    value={form.username}
                  />

                  <label className="font-bold">Código verificador</label>
                  <input
                    className="border p-3 shadow-sm text-black"
                    type="text"
                    placeholder="123456"
                    onChange={event => setForm(prev => ({...prev, token: event.target.value}))}
                    value={form.token}
                  />


                  <label className="font-bold">Nuevo password</label>
                  <input
                    className="border p-3 shadow-sm text-black"
                    type="password"
                    placeholder="newpassword"
                    onChange={event => setForm(prev => ({...prev, newPassword: event.target.value}))}
                    value={form.newPassword}
                  />

                  <label className="font-bold">Reingresar nuevo password</label>
                  <input
                    className="border p-3 shadow-sm text-black"
                    type="password"
                    placeholder="newpassword"
                    onChange={event => SetVerifyPassword(event.target.value)}
                    value={verifyPassword}
                  />

                  <input
                    className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300"
                    type="submit"
                    value="Restaurar"
                  />
          
                </form>

                <div className="flex justify-center gap-2 font-bold">
              <span>Ir a Login: </span>
              <Link
                href="/"
                className="text-sky-500"
              >LOGIN</Link>
            </div>
            </div>

            
        </div>
      </div>
    </main>
  );
}

export default RestorePage