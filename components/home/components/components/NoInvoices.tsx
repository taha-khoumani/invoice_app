import Image from 'next/image'
import React from 'react'
import no_invoices_img from '@/public/illustration-empty.svg'
import styles from '@/styles/css/NoInvoices.module.css'

export default function NoInvoices() {
  return (
    <div className={styles.no_invoices} >
        <Image src={no_invoices_img} alt={'no_invoices_img'} />
        <div>
            <h1>There is nothing here</h1>
            <p>Create an invoice by clicking the <br/> <b>New Invoice</b> button and get started</p>
        </div>
    </div>
  )
}
