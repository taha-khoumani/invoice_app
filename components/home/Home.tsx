import React, { useEffect } from 'react'
import HomeHeader from './components/HomeHeader'
import HomeMain from './components/HomeMain'
import styles from '@/styles/css/Home.module.css'
import data from '@/data.json'
import { useDispatch } from 'react-redux'
import { setAllInvoices } from '@/redux/slices/invoicesSlice'
import NewInvoice from './components/NewInvoice'
import { useSelector } from 'react-redux'

interface store{
  ui:{
    isNewInvoiceOpen:boolean
  }
}

export default function Home() {
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(setAllInvoices(data))
    },[])
    const {isNewInvoiceOpen} = useSelector((store:store)=>store.ui)

  return (
    <div className={styles.home} >
        <div className={styles.home_components_wraper} >
            <NewInvoice isNewInvoiceOpen={isNewInvoiceOpen} />
            <HomeHeader/>
            <HomeMain/>
        </div>
    </div>
  )
}
