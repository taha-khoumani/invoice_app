import React, { ReactNode } from 'react'

//components
import Navbar from './Navbar'

//styles
import styles from '@/styles/css/Wraper.module.css'

type props = {
    children:ReactNode
}

export default function Wraper(props:props) {
    const {children} = props
  return (
    <div className={styles.wraper} >
        <Navbar/>
        {children}
    </div>
  )
}
