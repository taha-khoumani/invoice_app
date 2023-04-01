import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import styles from '@/styles/css/Wraper.module.css'
import { useSelector } from 'react-redux'

type props = {
  children:ReactNode
}

interface RootState {
  ui: {
    theme:string
  }
}

export default function Wraper(props:props) {
  const {children} = props
  const {theme} = useSelector((store:RootState)=>store.ui)

  return (
    <div className={`${styles.wraper} ${theme}`} >
        <Navbar/>
        {children}
    </div>
  )
}
