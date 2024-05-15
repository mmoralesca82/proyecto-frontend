
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { sendEmailOTP } from "@/services/mssecurity"


import Link from "next/link"

export default function RecoveryPage() {

  const [username, setUsername] = useState('')

  const router = useRouter()
  
  const handleRecovery = async (event) => {
    event.preventDefault()

    const data = await sendEmailOTP(username)  

   

    window.alert(data.message)

    if(data.message==="Correo enviado con exito.")
          router.push('/restore')
  }

  return (
    <main className="container w-[400px] h-screen mx-auto space-y-4 flex flex-col justify-center">
      <div className="mx-auto flex w-full flex-col justify-center p-8">
        
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Recuperar contraseña</h1>
            <p className="text-sm text-slate-600">Ingrese usuario.</p>
          </div>    
            <div >
                <form
                  className="flex flex-col gap-2"
                  onSubmit={handleRecovery}
                >
                  <label className="font-bold">Usuario</label>
                  <input
                    className="border p-3 shadow-sm text-black"
                    type="text"
                    placeholder="youruser"
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                  />

                  <input
                    className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300"
                    type="submit"
                    value="Envíar correo"
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