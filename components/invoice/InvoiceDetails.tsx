import Link from 'next/link'
import React from 'react'
import styles from '@/styles/css/InvoiceDetails.module.css'

interface props {
  desiredInvoice:{
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
}

export default function InvoiceDetails(props:props) {
  const {
    id,
    status
  } = props.desiredInvoice

  function firstToCapital(status:string):string{
    return status[0].toUpperCase()+status.slice(1)
  }

  const writeButtons = (
    <div className={styles.write_buttons} >
      <button className='normal_button' >Edit</button>
      <button className='delete_button' >Delete</button>
      <button className='purple_button' >Mark as Paid</button>
    </div>
  )
  
  return (
    <>
      <div className={styles.invoice_details} >
        <div>
          <Link className={`${styles.go_back} go_back`} href={'/'}>
            <i className="fa-solid fa-angle-left"></i>
            Go Back
          </Link>
          <div 
            className={`${styles.invoice} invoice`} 
          >
            <div className={styles.status_div} >
              <p className='status_name' >Status</p>
              <button className={status} >
                <i className="fa-solid fa-circle"></i>
                {firstToCapital(status)}
              </button>
            </div>
            {writeButtons}
          </div>
        </div>
      </div>
      <div className={`on_mobile_write ${styles.on_mobile_write}`} >
        {writeButtons}
      </div>
    </>
  )
}

