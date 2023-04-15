import React, { useEffect, useState } from 'react'
import styles from '@/styles/css/HomeMain.module.css'
import { useSelector } from 'react-redux'
import Invoice from './components/Invoice'
import { useDispatch } from 'react-redux'
import { setFilteredOptimizedInvoices } from '@/redux/slices/invoicesSlice'
import NoInvoices from './components/NoInvoices'

interface RootStore {
  ui:{
    isFilterOn:boolean
    filter:string
  },
  invoices:{
    allInvoices:invoice[],
  }
}
interface invoice {
  id: string,
  createdAt: string,
  paymentDue: string,
  description: string,
  paymentTerms: number,
  clientName: string,
  clientEmail: string,
  status: string,
  senderAddress: {
    street: string,
    city: string,
    postCode: string,
    country: string
  },
  clientAddress: {
    street:string,
    city:string,
    postCode: string,
    country: string
  },
  items:{
    name: string,
    quantity: number,
    price: number,
    total: number
  }[],
  total: number
}
interface Props{
  invoices:invoice[]
}

export default function HomeMain(props:Props) {
  const {filter} = useSelector((store:RootStore)=>store.ui)
  const [invoices,setInvoices] = useState(fitlerAndOptimize(props.invoices))
  const {allInvoices} = useSelector((store:RootStore)=>store.invoices)

  function fitlerAndOptimize(rawInvoices:invoice[]){
    //optimize
    const invoicesNeededData = rawInvoices.map(invoice=>{
      const {id,paymentDue,clientName,total,status} = invoice
      return {id,paymentDue,clientName,total,status}
    })

    //filter
    const filteredData = (
      filter === 'All' ?
      invoicesNeededData :
      invoicesNeededData.filter(invoice=> invoice.status === filter.toLocaleLowerCase() )
    )

    return filteredData.reverse()
  }

  useEffect(()=>{
    setInvoices(fitlerAndOptimize(allInvoices))
  },[filter,allInvoices])

  return ( 
    invoices.length === 0 ?
    <NoInvoices /> :
    <div className={styles.main} >
      {invoices.map(invoice=><Invoice key={invoice.id} invoiceData={invoice} />)}
    </div>
  )
}