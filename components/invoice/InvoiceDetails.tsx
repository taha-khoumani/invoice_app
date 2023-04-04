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
    description,
    status,
    createdAt,
    paymentDue,
    paymentTerms,
    clientName,
    clientEmail,
    senderAddress,
    clientAddress,
    items,
    total,
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

          {/* Go Back */}
          <Link className={`${styles.go_back} go_back`} href={'/'}>
            <i className="fa-solid fa-angle-left"></i>
            Go Back
          </Link>

          {/* top section */}
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

          {/* main section */}
          <div className={`${styles.main} main`} >
            {/* first section */}
            <div className={styles.main_top}  >
              <div>
                <p>
                  <span>#</span>
                  {id}
                </p>
                <p>{description}</p>
              </div>
              <div>
                <p>{senderAddress.street}</p>
                <p>{senderAddress.city}</p>
                <p>{senderAddress.postCode}</p>
                <p>{senderAddress.country}</p>
              </div>
            </div>

            {/* middle section */}
            <div className={styles.main_mid}  >

              {/* middle left section */}
              <div className={styles.main_mid_left}   >
                <div className={styles.dates} >
                  <div>
                    <p>Invoice Date</p>
                    <p>{createdAt}</p>
                  </div>
                  <div>
                    <p>Payment Due</p>
                    <p>{paymentDue}</p>
                  </div>
                </div>
                <div className={styles.to_infos} >
                  <p>Bill To</p>

                  <p>{clientName}</p>

                  <p>{clientAddress.street}</p>
                  <p>{clientAddress.city}</p>
                  <p>{clientAddress.postCode}</p>
                  <p>{clientAddress.country}</p>
                </div>
              </div>

              {/* middle right section */}
              <div className={styles.main_mid_right}   >
                <div>
                  <p>Sent to</p>
                  <p>{clientEmail}</p>
                </div>
              </div>
            </div>

            {/* last section */}
            <div className={styles.main_bottom}  >
              {'money stuff'}
            </div>
          </div>
        </div>
      </div>
      <div className={`on_mobile_write ${styles.on_mobile_write}`} >
        {writeButtons}
      </div>
    </>
  )
}

