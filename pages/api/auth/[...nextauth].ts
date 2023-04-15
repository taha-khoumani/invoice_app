import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET} = process.env

if(!GOOGLE_CLIENT_ID) throw new Error("Invalid env variable: GOOGLE_CLIENT_ID")
if(!GOOGLE_CLIENT_SECRET) throw new Error("Invalid env variable: GOOGLE_CLIENT_SECRET")

export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret:GOOGLE_CLIENT_SECRET,
    })
  ],
//   secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)