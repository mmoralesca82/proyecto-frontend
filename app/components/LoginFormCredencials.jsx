'use client'

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import { signIn, useSession, signOut } from 'next-auth/react'
import Link from "next/link"

const LoginFormCredencials = () => {
  const { data: session, status } = useSession()

  const router = useRouter()

  const [ responseNextAuth , setResponseNextAuth ] = useState()

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

 

  const imgHosp = './complements/images/ImgHosp.jpg'

  const handleLogin = async (event) => {
    event.preventDefault();

    setResponseNextAuth(await signIn('credentials', {
      ...form,
      redirect: false
    }))
  }

  useEffect(()=>{
    if(status==='authenticated'){
      // DONE: Redirección a la ruta /dashboard
      router.push('/dashboard')
      return
    }else if (responseNextAuth?.status===200)
      window.alert('User y/o password incorrecto(s).')
  }, [responseNextAuth])


  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-4xl font-semibold">Login</h1>
        <p className="text-sm text-slate-600">Ingrese usuario y password.</p>
      </div>

  
        <div >
            <form
              className="flex flex-col gap-2"
              onSubmit={handleLogin}
            >
              <label className="font-bold">User</label>
              <input
                className="border p-3 shadow-sm text-black"
                type="text"
                placeholder="youruser"
                onChange={event => setForm(prev => ({ ...prev, username: event.target.value }))}
                value={form.username}
              />

              <label className="font-bold">Password</label>
              <input
                className="border p-3 shadow-sm text-black"
                type="password"
                placeholder="mipass"
                onChange={event => setForm(prev => ({ ...prev, password: event.target.value }))}
                value={form.password}
              />

              <input
                className="border p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 duration-300"
                type="submit"
                value="Login"
              />

              {/* {JSON.stringify(form)} */}

              {/* {session?.user && (
                <div>
                  <span>Hola {session.user.email}</span>
                  <img src={session.user.avatar} className="w-11" />
                  <button onClick={() => signOut()} className="text-red-500">Logout</button>
                </div>
              )} */}

              {/* {status} */}

              {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
            </form>

            <div className="flex justify-center gap-2 font-bold">
              <span>¿No recuerdas tu password?</span>
              <Link
                href="/recovery"
                className="text-sky-500"
              >Recuperar</Link>
            </div>
        </div>
    </div>

      
  )
}

export default LoginFormCredencials