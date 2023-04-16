import Head from 'next/head'
import Home from "@/components/home/Home"
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]';
import { Context } from 'vm';

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

  if(!session || !session.user){
    return {
      props: {
        stringInvoice:JSON.stringify([]),
        message:'noAuth'
      },
    }
  }else{
    const {email} = session.user
    const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
    const users = client.db('invoice').collection("users")
    const result = await users.findOne({'userData.email':email})

    return {
      props: {
        stringInvoice:JSON.stringify(result?.invoices),
        message:result?.invoices.length === 0 ? 'noInvoices' : 'allGood'
      },
    }
  }


}
