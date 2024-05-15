
import Link from "next/link"

const MenuBar = () => {
  return (
    <div className='fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-slate-300 w-52 text-black '>
    
        <h1 className="text-center text-2xl ">INTRANET</h1>

        <ul className="mt-28 mx-7">
            <Link href="/dashboard/administracion">
                <li className="my-8 text-lg bg-sky-700 text-white text-center rounded-md w-36  hover:bg-slate-500 cursor-pointer">Administración</li>
            </Link>
            <Link href="/dashboard/admision">
                <li className="my-8 text-lg bg-sky-700 text-white text-center rounded-md w-36  hover:bg-slate-500 cursor-pointer">Admisión</li>
            </Link>
            <Link href="/dashboard/consulta">
                <li className="my-8 text-lg bg-sky-700 text-white text-center rounded-md w-36  hover:bg-slate-500 cursor-pointer">Consulta</li>
            </Link>
            <Link href="/dashboard/laboratorio">
                <li className="my-8 text-lg bg-sky-700 text-white text-center rounded-md w-36  hover:bg-slate-500 cursor-pointer">Laboratorio</li>
            </Link>
        </ul>


    </div>
  )
}

export default MenuBar