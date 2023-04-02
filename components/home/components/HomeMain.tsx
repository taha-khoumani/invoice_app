import React from 'react'
import styles from '@/styles/css/HomeMain.module.css'
import { useSelector } from 'react-redux'
import Invoice from './components/Invoice'

interface RootStore {
  ui:{
    isFilterOn:boolean
    filter:string
  },
  invoices:{
    invoices:{
      id:string,
      paymentDue:string,
      clientName:string,
      status:string,
      total: number
    }[]
  }
}


export default function HomeMain() {
  const {invoices} = useSelector((store:RootStore)=>store.invoices)
  const invoicesNeededData = invoices.map(invoice=>{
    const {id,paymentDue,clientName,total,status} = invoice
    return {id,paymentDue,clientName,total,status}
  })

  const invoicesEls = invoicesNeededData.map(invoice=><Invoice key={invoice.id} invoiceData={invoice} />)

  return (
    <div className={styles.main} >
      {invoicesEls}
    </div>
  )
}
