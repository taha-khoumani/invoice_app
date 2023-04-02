import React, { useEffect } from 'react'
import HomeHeader from './components/HomeHeader'
import HomeMain from './components/HomeMain'
import styles from '@/styles/css/Home.module.css'
import data from '@/data.json'
import { useDispatch } from 'react-redux'
import { setInvoices } from '@/redux/slices/invoicesSlice'

export default function Home() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setInvoices(data))
    },[])

  return (
    <div className={styles.home} >
        <div className={styles.home_components_wraper} >
            <HomeHeader/>
            <HomeMain/>
        </div>
    </div>
  )
}
