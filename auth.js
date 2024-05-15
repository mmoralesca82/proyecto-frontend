import NextAuth from "next-auth";

import Credentials from 'next-auth/providers/credentials'
// import GitHub from 'next-auth/providers/github'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize (credentials, req) {
        // Aquí es donde haremos el llamado al endpoint de autenticación

        // console.log(credentials)
        const API_URL = process.env.NEXT_PUBLIC_MS_SEC_URL
        
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        }

        const response = await fetch(`${API_URL}/ms-security/v1/autenticacion/login`, options)

        // const response = await fetch("https://mockmentor.onrender.com/auth/login", options)

        const user = await response.json()

        console.log('esta es la info del user', user)

        

        if (!response.ok) return user

        

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Devolvemos la información del backend completa
      console.log('es el user', user)
      console.log('es el token', token)
      
      return { ...token, ...user }
      
    },
    async session({ session, token }) {
      console.log('antes de:', session.user)
      // session.user = token.username
      session.user = token

      console.log('despues de:', session.user)

      return session
    }
  },
  pages: {
    signIn: '/',
    signOut: '/'
  }
})