import React, { useEffect } from 'react'
import styles from '@/styles/css/HomeMain.module.css'
import { useSelector } from 'react-redux'
import Invoice from './components/Invoice'
import { useDispatch } from 'react-redux'
import { setFilteredOptimizedInvoices } from '@/redux/slices/invoicesSlice'

interface RootStore {
  ui:{
    isFilterOn:boolean
    filter:string
  },
  invoices:{
    allInvoices:{
      id:string,
      paymentDue:string,
      clientName:string,
      status:string,
      total: number
    }[],
    filteredOptimizedInvoices:{
      id:string,
      paymentDue:string,
      clientName:string,
      status:string,
      total: number
    }[],
  }
}


export default function HomeMain() {
  // raw-data
  const {allInvoices,filteredOptimizedInvoices} = useSelector((store:RootStore)=>store.invoices)
  const {filter} = useSelector((store:RootStore)=>store.ui)
  const dispatch = useDispatch()

  useEffect(()=>{
    //optimazed-data
    const invoicesNeededData = allInvoices.map(invoice=>{
      const {id,paymentDue,clientName,total,status} = invoice
      return {id,paymentDue,clientName,total,status}
    })

    //filtered-data
    const filteredData = (
      filter === 'All' ?
      invoicesNeededData :
      invoicesNeededData.filter(invoice=> invoice.status === filter.toLocaleLowerCase() )
    )

    //send export data
    dispatch(setFilteredOptimizedInvoices(filteredData))

  },[filter])

  //desired-data
  const invoicesEls = filteredOptimizedInvoices.map(invoice=><Invoice key={invoice.id} invoiceData={invoice} />)

  return (
    <div className={styles.main} >
      {invoicesEls}
    </div>
  )
}