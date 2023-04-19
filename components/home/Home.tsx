import React, { useEffect } from 'react'
import HomeHeader from './components/HomeHeader'
import HomeMain from './components/HomeMain'
import styles from '@/styles/css/Home.module.css'
import { useDispatch } from 'react-redux'
import { setAllInvoices } from '@/redux/slices/invoicesSlice'
import NewInvoice from './components/NewInvoice'
import { useSelector } from 'react-redux'
import data from '@/data.json'
import NotSignedIn from './components/NotSignedIn'

interface store{
  ui:{
    isNewInvoiceOpen:boolean,
    isNotSignedInModuleOpen:boolean,
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
  invoices:invoice[],
  message:string,
}

export default function Home(props:Props) {
    const {invoices,message} = props
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(setAllInvoices(invoices))
    },[])
    const {isNewInvoiceOpen,isNotSignedInModuleOpen} = useSelector((store:store)=>store.ui)
    console.log(isNotSignedInModuleOpen)
  return (
    <div className={styles.home} >
        <div className={styles.home_components_wraper} >
            <NewInvoice isNewInvoiceOpen={isNewInvoiceOpen} />
            <NotSignedIn isNotSignedInModuleOpen={isNotSignedInModuleOpen} />
            <HomeHeader invoicesLength={invoices.length} />
            <HomeMain message={message} invoices={invoices} />
        </div>
    </div>
  )
}
