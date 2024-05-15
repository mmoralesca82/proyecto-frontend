'use client'

export const RegistrarConsulta = async (token, form ) => {

    const API_URL = process.env.NEXT_PUBLIC_MS_MEDICINA_URL

    console.log(form)
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    } 
      
    const response = await fetch(`${API_URL}/ms-medicina/api/v1/consulta`, options)
  
    return await response.json()
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  export const ObtenerCitasMedicasConDoc = async (token, numDocumento) => {

    const API_URL = process.env.NEXT_PUBLIC_MS_MEDICINA_URL

      const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    } 
       
    const response = await fetch(`${API_URL}/ms-medicina/api/v1/consulta/${numDocumento}`, options)
  
    return await response.json()
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////

export const EliminarConsulta = async (token, idConsulta) => {

  const API_URL = process.env.NEXT_PUBLIC_MS_MEDICINA_URL

    const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  } 
     
  const response = await fetch(`${API_URL}/ms-medicina/api/v1/consulta/${idConsulta}`, options)

  return await response.json()
}


/////////////////////////////////////////////////////////////////////////////////////////////////////

