import React, { useEffect } from 'react'
import Head from 'next/head'
import InvoiceDetails from '@/components/invoice/InvoiceDetails'
import EditInvoice from '@/components/invoice/EditInvoice'
import DeleteModul from '@/components/invoice/DeleteModul'
import { MongoClient } from "mongodb";
import { Context } from 'vm'
import { useDispatch } from 'react-redux'
import { setCurrentInvoice } from '@/redux/slices/invoicesSlice'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import {invoice} from '@/lib/types'

interface Props{
  stringInvoice:string
}

export default function invoiceID(props:Props) {
  if(!props.stringInvoice) return;
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

export async function getServerSideProps({params,req,res}:Context) {
  const session = await getServerSession(req, res, authOptions)
  const currentInvoiceID = params.invoiceID

  //database
  const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
  const users = client.db('invoice').collection("users")
  const currentUserOwnWantedInvoice = await users.findOne({'invoices.id':currentInvoiceID,'userData.email':session?.user?.email})

  if(!session || !session.user || !session.user.email ){
    return {
      props: {},
      redirect:{
        permanent:false,
        destination:'/'
      }
    }
  } else if(!currentUserOwnWantedInvoice){
    return {
      props: {},
      redirect:{
        permanent:false,
        destination:'/'
      }
    }
  } else{
  const {email} = session.user

    const result = await users.findOne({'userData.email':email})
    const wantedInvoice = result?.invoices.find((invoice:invoice)=>invoice.id === currentInvoiceID)

    return {
      props: {
        stringInvoice:JSON.stringify(wantedInvoice),
      },
    }
  }
}