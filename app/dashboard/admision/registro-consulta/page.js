import FormularioRegistroConsulta from "@/app/components/registro-consulta/FormularioRegistroConsulta"

const RegistroConsulta = () => {
  return (
    <main className='container m-auto p-6 pt-10 mx-60'>
      <div className="mx-auto flex w-full flex-col justify-center p-16">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1 text-center">
            <h3 className="text-xl font-semibold">Registrar Consulta</h3>
          </div>
            <FormularioRegistroConsulta />
        </div>
      </div>    
    </main>
  )
}
export default RegistroConsulta