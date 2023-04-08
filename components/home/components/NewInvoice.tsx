import React, { FormEvent, use, useEffect, useRef, useState } from 'react'
import styles from '@/styles/css/NewInvoice.module.css'
import { useDispatch } from 'react-redux';
import { toggleNewInvoice } from '@/redux/slices/uiSlice';
import Input from './components/Input';
import { setModaleStyles } from '@/lib/functions';
import Item from './components/Item';

interface props {
    isNewInvoiceOpen:boolean
}

export default function NewInvoice(props:props) {
  const {isNewInvoiceOpen} = props

  if(!isNewInvoiceOpen) return null;

  const refForm = useRef(null)
  const refButtons = useRef(null)
  const wrapperRef = useRef(null)
  const paymentOptionsRef = useRef(null)
  const paymentWrapper = useRef(null)
//   const dateRef = useRef(null)

  const dispatch = useDispatch()

  //event-handlers
  function onScrollHandler(){
    // @ts-ignore: Object is possibly 'null'.
    refForm.current.scrollTop + refForm.current.offsetHeight>= refForm.current.scrollHeight ?
    // @ts-ignore: Object is possibly 'null'.
    refButtons.current.style.boxShadow = "none":
    // @ts-ignore: Object is possibly 'null'.
    refButtons.current.style.boxShadow = null;
  }
  function onCancelHandler(){
    setModaleStyles(false)
    dispatch(toggleNewInvoice(false))
  }
  function onAddItemHandler(){
    setEi((prev)=>{
        return [
            ...prev,
            {
                name:"",
                quantity:0.00,
                price:0.00,
                total:0.00
            }
        ]
    })
    const form = refForm.current
    setTimeout(
        ()=>{
            console.log('run')
            // @ts-ignore: Object is possibly 'null'.
            form.scroll({top:form.scrollHeight,behavior:'smooth'})
        },0
    )
  }
  function selectPayment(paymentTerms:number){
    setPayment(paymentTerms)
    togglePayment(false)
  }

  const borderColor = {
    borderColor:'#9277FF'
  }

  useEffect(()=>{

    function toggleOff(e:FormEvent){
        console.log(e)
        const {parentElement} = e.target as HTMLButtonElement
        const paymentOptions = paymentOptionsRef.current
        if(
            !paymentOptions 
            || 
            paymentWrapper.current === parentElement
            ||
            paymentWrapper.current === parentElement?.parentElement 
            ||
             paymentOptions === parentElement) return;
        togglePayment(false)
    }

    // @ts-ignore: Object is possibly 'null'.
    wrapperRef.current.addEventListener('click',toggleOff)

    // @ts-ignore: Object is possibly 'null'.
    return ()=>{wrapperRef.current.removeEventListener('click',toggleOff)}
  },[paymentOptionsRef])


  //temporary-state
  const [payment,setPayment] = useState(30)
  const [isPaymentOpen,togglePayment] = useState(false)
  const [ei,setEi] = useState([
    {
      "name": "Banner Design",
      "quantity": 1,
      "price": 156.00,
      "total": 156.00
    },
    {
      "name": "Email Design",
      "quantity": 2,
      "price": 200.00,
      "total": 400.00
    }
  ])

  return (
    <div 
        className={`${styles.write_invoice_first_wrapper}`}
        onClick={onCancelHandler}
    >
        <div 
            className={`${styles.write_invoice_second_wrapper} write`} 
            onClick={(e)=>e.stopPropagation()}
        >
            <div className={`${styles.write_invoice_second_half_wrapper}`} id='form_wrapper' ref={wrapperRef} >
                <div 
                    ref={refForm} 
                    className={`${styles.write_invoice_third_wrapper}`}
                    onScroll={onScrollHandler}
                >
                    <p className={`${styles.title}`} >New Invoice</p>
                    <div className={`${styles.from}`} >
                        <p className={`${styles.section_title}`} >Bill From</p>
                        <div className={`${styles.from_inputs}`} >
                            <Input 
                                label='Street Address'
                                customStyles={styles.street_address}
                            />
                            <Input 
                                label='City'
                                customStyles={styles.city}
                            />
                            <Input 
                                label='Post Code'
                                customStyles={styles.post_code}
                            />
                            <Input 
                                label='Country'
                                customStyles={styles.country}
                            />
                        </div>
                    </div>
                    <div className={`${styles.to}`} >
                        <p className={`${styles.section_title}`} >Bill To</p>
                        <div className={`${styles.to_inputs}`} >
                            <Input 
                                label="Client's Name"
                                customStyles={styles.client_name}
                            />
                            <Input 
                                label="Client's Email"
                                customStyles={styles.client_email}
                            />
                            <Input 
                                label='Street Address'
                                customStyles={styles.client_street_address}
                            />
                            <Input 
                                label='City'
                            />
                            <Input 
                                label='Post Code'
                            />
                            <Input 
                                label='Country'
                                customStyles={styles.client_country}
                            />
                        </div>
                    </div>
                    <div className={`${styles.other_infos}`} >
                        <Input 
                            label={'Invoice Date'}
                            type={'date'}
                            customStyles={`${styles.date} date`}
                        />
                        <div className={`${styles.payment}`} >
                            <label className={`input_label ${styles.payment_label}`} >{'Payment Terms'}</label>
                            <div ref={paymentWrapper} className={`${styles.payment_input}`} >
                                <div 
                                    className={`${styles.chosen_payment} input_input`} 
                                    style={isPaymentOpen?borderColor:{}}
                                    onClick={(e)=>{
                                        togglePayment(prev=>!prev)
                                        e.stopPropagation()
                                    }}
                                >
                                    <p>{`Net ${payment} Day${payment === 1 ? '' : 's'}`}</p>
                                    <i className={`fa-sharp fa-solid fa-angle-${isPaymentOpen ? "up" : "down"}`}></i>
                                </div>
                                {
                                    isPaymentOpen &&
                                    <div ref={paymentOptionsRef} className={`${styles.payment_options} payment_options`} >
                                        <p onClick={()=>selectPayment(1)} >Net 1 Day</p>
                                        <p onClick={()=>selectPayment(7)}>Net 7 Days</p>
                                        <p onClick={()=>selectPayment(14)}>Net 14 Days</p>
                                        <p onClick={()=>selectPayment(30)}>Net 30 Days</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <Input 
                            label='Project Description'
                            customStyles={`${styles.project_description}`}
                        />
                    </div>
                    <div className={`${styles.items_wraper}`} >
                        <p className={`${styles.items_title}`} >Item List</p>
                        <div className={`${styles.items_header}`} >
                            <p className={`${styles.items_header_name}`} >Item Name</p>
                            <p className={`${styles.items_header_qty}`} >Qty.</p>
                            <p className={`${styles.items_header_price}`}>Price</p>
                            <p className={`${styles.items_header_total}`} >Total</p>
                        </div>
                        {
                            ei.map((item,index)=>(
                                <Item 
                                    key={index}
                                    itemData={item} 
                                    writeHandler={setEi}
                                    index={index}
                                />
                            ))
                        }
                        <button 
                            className={`${styles.new_item} normal_button`} 
                            onClick={onAddItemHandler}
                        >
                            + Add New Item
                        </button>
                    </div>
                </div>
                <div ref={refButtons} className={`${styles.buttons} buttons`} >
                    <button className={`${styles.reverse_normal_button}`} >Discard</button>
                    <button className={`${styles.save}`} >Save as Draft</button>
                    <button className={`purple_button`} >Save & Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}
