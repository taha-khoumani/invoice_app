import React, { useEffect } from 'react'
import Head from 'next/head'
import InvoiceDetails from '@/components/invoice/InvoiceDetails'
import EditInvoice from '@/components/invoice/EditInvoice'
import DeleteModul from '@/components/invoice/DeleteModul'
import { MongoClient } from "mongodb";
import { Context } from 'vm'
import { useDispatch } from 'react-redux'
import { setCurrentInvoice } from '@/redux/slices/invoicesSlice'

interface Props{
  stringInvoice:string
}

export default function invoiceID(props:Props) {
  const invoice = JSON.parse(props.stringInvoice)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setCurrentInvoice(invoice))
  },[])

  if(!invoice) return <h1>no invoice with corespendant ID</h1>;
    
  return (
    <>
      <Head>
          <title>Invoices</title>
          <link rel="icon" href="/favicon.svg" />
      </Head>
      <InvoiceDetails desiredInvoice={invoice} />
      <EditInvoice desiredInvoice={invoice} />
      <DeleteModul id={invoice.id} />
    </>
  )
}

export async function getServerSideProps({params}:Context) {
  const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
  const invoices = client.db('invoice').collection("invoices")
  const result = await invoices.findOne({id:params.invoiceID})

  return {
    props: {
      stringInvoice:JSON.stringify(result)
    },
  }
}