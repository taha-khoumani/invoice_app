import Head from 'next/head'
import Home from "@/components/home/Home"
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]';
import { Context } from 'vm';
import defaultInvoices from "@/data.json"

interface Props{
  stringInvoice:string,
  message:string
}

export default function HomePage(props:Props) {
  const {message,stringInvoice} = props
  const invoices = JSON.parse(stringInvoice)
  
  return (
    <>
      <Head>
        <title>Invoices</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Home message={message} invoices={invoices} />
    </>
  )
}

export async function getServerSideProps({req,res}:Context) {
  const session = await getServerSession(req, res, authOptions)

  if(!session || !session.user || !session.user.email ){
    return {
      props: {
        stringInvoice:JSON.stringify([]),
        message:'noAuth'
      },
    }
  }else{
    const {email} = session.user

    //connect to database and select users collection
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const users = client.db('invoice').collection("users")

    //store if user is signed up in a var
    const isUserRegisteredResult = await users.findOne({'userData.email':email})

    //store the user invoices in a var
    const jsonUserResult = await users.findOne({'userData.email':email})
    const invoiceResult = JSON.stringify(jsonUserResult?.invoices)

    const returnedObject = {
      props: {
        stringInvoice: invoiceResult,
        message:jsonUserResult?.length === 0 ? 'noInvoices' : 'allGood'
      },
    }

  
    //if the user is signed in
    if(isUserRegisteredResult){
      client.close()
      
      //return the user's invoices
      return returnedObject
    }
    
    //if the user is not signed in
    else{
      //sign user up
      const result = await users.insertOne({
        userData:session.user,
        invoices:defaultInvoices,
      })

      client.close()

      //refresh
      return {
        redirect:{
          permanent:false,
          destination:'/'
        }
      }
    }


  }

}
