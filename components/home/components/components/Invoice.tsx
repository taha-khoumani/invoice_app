import React from 'react'
import styles from '@/styles/css/Invoice.module.css'
import rightArrow from '@/public/icon-arrow-right.svg'
import Image from 'next/image'

interface invoice {
    id:string,
    paymentDue:string,
    clientName:string,
    status:string,
    total: number
}

interface props {
    key:string,
    invoiceData:invoice
}

export default function Invoice(props:props) {
    const {id,paymentDue,clientName,total,status} = props.invoiceData
    function firstToCapital(status:string):string{
        return status[0].toUpperCase()+status.slice(1)
    }

  return (
    <div className={`${styles.invoice} invoice`} >
        <div className={styles.invoice_I} >
            <p className={styles.id} >
                <span>#</span>
                {id}
            </p> 
            <p className={`${styles.due} due`} >Due {paymentDue}</p>
            <p className={`${styles.name} name`} >{clientName}</p>
        </div>
        <div className={styles.invoice_II} >
            <p className={styles.total} >{total} $</p>
            <button className={status} >
                <i className="fa-solid fa-circle"></i>
                {firstToCapital(status)}
            </button>
            <Image src={rightArrow} alt='left-arrow' />
        </div>
    </div>
  )
}
