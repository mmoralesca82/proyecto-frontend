export const RegistrarPaciente = async (token, form ) => {

    const API_URL = process.env.NEXT_PUBLIC_MS_REGISTER_URL
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({...form, fechaNacimiento : convertDateFormat(form?.fechaNacimiento)} )
    } 
      
    const response = await fetch(`${API_URL}/ms-registro/api/v1/paciente`, options)
  
    return await response.json()
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  export const ConsultarPaciente = async (token, numDocumento ) => {

    const API_URL = process.env.NEXT_PUBLIC_MS_REGISTER_URL

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    } 
       
    const response = await fetch(`${API_URL}/ms-registro/api/v1/paciente/${numDocumento}`, options)
  
    return await response.json()
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////

  export const ActualizarPaciente = async (token, form ) => {

    const API_URL = process.env.NEXT_PUBLIC_MS_REGISTER_URL
    
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({...form, fechaNacimiento : convertDateFormat(form?.fechaNacimiento)} )
    } 
      
    const response = await fetch(`${API_URL}/ms-registro/api/v1/paciente`, options)
  
    return await response.json()
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

    export const ObtenerEspecialidades = async (token) => {

    const API_URL = process.env.NEXT_PUBLIC_MS_REGISTER_URL

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    } 
       
    const response = await fetch(`${API_URL}/ms-registro/api/v1/especialidad/all`, options)
  
    return await response.json()
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  export const ObtenerDoctores = async (token) => {

    const API_URL = process.env.NEXT_PUBLIC_MS_REGISTER_URL

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    } 
       
    const response = await fetch(`${API_URL}/ms-registro/api/v1/doctor/all`, options)
  
    return await response.json()
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  const convertDateFormat = (string)  =>{  
    return string.split('-').reverse().join('/')
  }