import Image from 'next/image'
import React from 'react'
import no_invoices_img from '@/public/illustration-empty.svg'
import styles from '@/styles/css/NoInvoices.module.css'

interface Props{
  message:string
}

export default function NoInvoices(props:Props) {
  const {message} = props

  return (
    <div className={styles.no_invoices} >
        <Image src={no_invoices_img} alt={'no_invoices_img'} />
        {
          message === 'noAuth' ?
          (
            <div>
                <h1>Sign in to acces your invoices</h1>
                <p>
                  To Login and view you invoices.
                  <br/>  
                  Click on the <b><i className="fa-solid fa-right-to-bracket"></i></b>&nbsp; icon and get started.
                </p>
            </div>
          )
          :
          (
            <div>
              <h1>There is nothing here</h1>
              <p>Create an invoice by clicking the <br/> <b>New Invoice</b> button and get started</p>
            </div>
          )
        }
    </div>
  )
}
