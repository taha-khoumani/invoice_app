import React from 'react'
import styles from '@/styles/css/Invoice.module.css'
import rightArrow from '@/public/icon-arrow-right.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { formatDate } from '@/lib/functions'

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

    const router = useRouter()

    function onClickHandler(){
        router.push(`/${id}`)
    } 

  return (
    <div 
        className={`${styles.invoice} invoice`} 
        onClick={onClickHandler}
    >
        <div className={styles.invoice_I} >
            <p className={styles.id} >
                <span>#</span>
                {id}
            </p> 
            <p className={`${styles.due} due`} >Due {formatDate(paymentDue)}</p>

            {/* if desktop --> css */}
            <p className={`${styles.name_desktop} name`} >{clientName}</p>

            {/* if mobile --> css */}
            <p className={styles.total_mobile} >{total} $</p>
        </div>
        <div className={styles.invoice_II} >
            {/* if mobile --> css */}
            <p className={`${styles.name_mobile} name`} >{clientName}</p>

            {/* if desktop --> css */}
            <p className={styles.total_desktop} >{total.toLocaleString()} $</p>

            <button className={status} >
                <i className="fa-solid fa-circle"></i>
                {firstToCapital(status)}
            </button>
            <Image src={rightArrow} alt='left-arrow' />
        </div>
    </div>
  )
}
