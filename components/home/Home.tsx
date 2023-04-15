import React, { useEffect } from 'react'
import HomeHeader from './components/HomeHeader'
import HomeMain from './components/HomeMain'
import styles from '@/styles/css/Home.module.css'
import { useDispatch } from 'react-redux'
import { setAllInvoices } from '@/redux/slices/invoicesSlice'
import NewInvoice from './components/NewInvoice'
import { useSelector } from 'react-redux'
import data from '@/data.json'

interface store{
  ui:{
    isNewInvoiceOpen:boolean
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

export default function Home(props:Props) {
    const {invoices} = props
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(setAllInvoices(invoices))
    },[])
    const {isNewInvoiceOpen} = useSelector((store:store)=>store.ui)

  return (
    <div className={styles.home} >
        <div className={styles.home_components_wraper} >
            <NewInvoice isNewInvoiceOpen={isNewInvoiceOpen} />
            <HomeHeader invoicesLength={invoices.length} />
            <HomeMain invoices={invoices} />
        </div>
    </div>
  )
}
