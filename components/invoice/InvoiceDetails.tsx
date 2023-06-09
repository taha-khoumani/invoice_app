import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/css/InvoiceDetails.module.css'
import { useDispatch } from 'react-redux'
import { toggleDeleteModule, toggleEditInvoice } from '@/redux/slices/uiSlice'
import { formatDate, setModaleStyles } from '@/lib/functions'
import { useSelector } from 'react-redux'
import { setCurrentInvoice, setRunEditOnLoad } from '@/redux/slices/invoicesSlice'
import { useSession } from 'next-auth/react'

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
interface item {
  name: string,
  quantity: number,
  price: number,
  total: number
}
interface invoice {
  id:string,
  createdAt:string,
  paymentDue:string,
  description:string,
  paymentTerms: number,
  clientName:string,
  clientEmail:string,
  status:string,
  senderAddress: {
    street:string,
    city:string,
    postCode:string,
    country:string
  },
  clientAddress: {
    street:string,
    city:string,
    postCode:string,
    country:string
  },
  items: item[],
  total: number
}
interface store{
  invoices:{
    currentInvoice:invoice,
  }
}

export default function InvoiceDetails(props:props) {
  const [invoice,setInvoice] = useState(props.desiredInvoice)
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
  } = invoice
  const dispatch = useDispatch()
  const {currentInvoice} = useSelector((store:store)=>store.invoices)
  const {data} = useSession()

  useEffect(()=>{
    setInvoice(currentInvoice)
  },[currentInvoice])

  function firstToCapital(status:string):string{
    return status[0].toUpperCase()+status.slice(1)
  }

  const writeButtons = (
    <div className={styles.write_buttons} >
      <button 
        className='normal_button'
        onClick={()=>{
          setModaleStyles(true)
          dispatch(toggleEditInvoice(true))
        }}
      >
        Edit
      </button>
      <button 
        className='delete_button' 
        onClick={()=>{
          setModaleStyles(true)
          dispatch(toggleDeleteModule(true))
        }}
      >
        Delete
      </button>
      <button 
        className='purple_button' 
        onClick={async()=>{
          if(invoice.status === 'paid') return;
          if(invoice.status === 'draft'){
            dispatch(toggleEditInvoice(true))
            dispatch(setRunEditOnLoad(true))
          }
          if(invoice.status === 'pending'){
            const paidInvoice = {
              ...invoice,
              status:'paid'
            }
            const jsonResult = await fetch('/api/editInvoice',{
              method: 'PATCH',
              body: JSON.stringify ({
                  invoiceData:paidInvoice,
                  userEmail:data?.user?.email
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            dispatch(setCurrentInvoice(paidInvoice))
          }
        }}
      >
        Mark as Paid
      </button>
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
            <div className={`${styles.main_top} global_main_top`}  >
              <div>
                <p className={`${styles.id} ${"bolds"}`} >
                  <span>#</span>
                  {id}
                </p>
                <p>{description}</p>
              </div>
              <div className={styles.from_infos} >
                <p>{senderAddress.street}</p>
                <p>{senderAddress.city}</p>
                <p>{senderAddress.postCode}</p>
                <p>{senderAddress.country}</p>
              </div>
            </div>

            {/* middle section */}
            <div className={`${styles.main_mid} global_main_mid`}  >

              {/* middle left section */}
              <div className={styles.main_mid_left}   >
                <div className={styles.dates} >
                  <div>
                    <p>Invoice Date</p>
                    <p className={"bolds"} >{formatDate(createdAt)}</p>
                  </div>
                  <div>
                    <p> Payment Due</p>
                    <p className={"bolds"} >{formatDate(paymentDue)}</p>
                  </div>
                </div>
                <div className={styles.to_infos} >
                  <p>Bill To</p>

                  <p className={"bolds"} >{clientName}</p>

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
                  <p className={"bolds"} >{clientEmail}</p>
                </div>
              </div>
            </div>

            {/* last section */}
            <div className={styles.main_bottom}  >

              {/* items */}
              <div className={`total_details ${styles.total_details}`}>
                <div className={styles.total_details_name}>
                  <p>Item Name</p>
                  {items.map((item,index)=>(
                      <p 
                        className={"bolds"} 
                        key={index} 
                      >
                        {item.name}
                      </p>
                    )
                  )}
                </div>
                <div className={styles.total_details_details}>
                  <div>
                    <p>QTY.</p>
                    {items.map((item,index)=> <p key={index} >{item.quantity}</p>)}
                  </div>
                  <div>
                    <p>Price</p>
                    {items.map((item,index)=> <p key={index} >{item.price} $</p>)}
                  </div>
                  <div>
                    <p>Total</p>
                    {items.map((item,index)=> <p className={"bolds"} key={index} >{item.total} $</p>)}
                  </div>
                </div>
              </div>

              {/* ON MOBILE ONLY */}
                    <div className={`total_details ${styles.total_details_mobile}`}>
                      {
                        items.map((item,index)=>(
                          <div key={index}>
                            <div className={`${styles.first_div}`} >
                              <p className={`mobile_black_white`} >{item.name}</p>
                              <p>{`${item.quantity} x ${item.price} $`}</p>
                            </div>
                            <div>
                              <p className={`mobile_black_white`} >{item.total} $</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
              {/*  */}
              
              {/* total_infos */}
              <div className={`total_div ${styles.total_div}`} >
                <p>Amount Due</p>
                <p className={`${styles.grand_total}`} >{total} $</p>
              </div>
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

