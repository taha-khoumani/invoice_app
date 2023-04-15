import Head from 'next/head'
import Home from "@/components/home/Home"
import { MongoClient } from "mongodb";

interface Props{
  stringInvoice:string
}

export default function HomePage(props:Props) {
  const invoices = JSON.parse(props.stringInvoice)
  
  return (
    <>
      <Head>
        <title>Invoices</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Home invoices={invoices} />
    </>
  )
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
  const invoices = client.db('invoice').collection("invoices")
  const result = await invoices.find({}).toArray()

  return {
    props: {
      stringInvoice:JSON.stringify(result)
    },
  }
}