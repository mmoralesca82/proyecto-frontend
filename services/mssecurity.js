export const sendEmailOTP = async (username) => {

  
  const API_URL = process.env.NEXT_PUBLIC_MS_SEC_URL

   const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  } 

  const response = await fetch(`${API_URL}/ms-security/v1/autenticacion/recovery/${username}`, options)

  return await response.json()
}


export const restorePassword = async (form) => {

 
  const API_URL = process.env.NEXT_PUBLIC_MS_SEC_URL

   const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  } 

  const response = await fetch(`${API_URL}/ms-security/v1/autenticacion/restore`, options)

  return await response.json()
}


// export const getInfoTokenRegistro = async (token) => {
 
//     // const { data: session } = useSession()

//     const API_URL = process.env.MS_SEC_URL

//      const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     } 
   
    
//     const response = await fetch(`${API_URL}/ms-security/v1/autenticacion/verify`, options)
  
//     return await response.json()
//   }



export const RegistrarUsuario = async (token, form ) => {

  const API_URL = process.env.NEXT_PUBLIC_MS_SEC_URL

  console.log(token)
  console.log(form)
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(form)
  } 
    
  const response = await fetch(`${API_URL}/ms-security/v1/system/register`, options)

  return await response.json()
}