import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import InvoiceDetails from '@/components/invoice/InvoiceDetails'
import data from '@/data.json'
import EditInvoice from '@/components/invoice/EditInvoice'
import DeleteModul from '@/components/invoice/DeleteModul'

export default function invoiceID() {
  const router = useRouter()
  const {invoiceID} = router.query
  const desiredInvoice = data.find(invoice=>invoice.id === invoiceID)
  if(!desiredInvoice) return <h1>no invoice with corespendant ID</h1>;
    
  return (
    <>
      <Head>
          <title>Invoices</title>
          <link rel="icon" href="/favicon.svg" />
      </Head>
      <InvoiceDetails desiredInvoice={desiredInvoice} />
      <EditInvoice desiredInvoice={desiredInvoice} />
      <DeleteModul id={desiredInvoice.id} />
    </>
  )
}
