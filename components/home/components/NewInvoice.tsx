import React, { DOMElement, FormEvent, useEffect, useRef, useState } from 'react'
import styles from '@/styles/css/NewInvoice.module.css'
import { useDispatch } from 'react-redux';
import { toggleNewInvoice } from '@/redux/slices/uiSlice';
import Input from './components/Input';
import { setModaleStyles, validateInvoiceData } from '@/lib/functions';
import Item from './components/Item';
import { nanoid } from 'nanoid';
import AuthFeedback from '@/components/ui/AuthFeedback';

interface props {
    isNewInvoiceOpen:boolean
}

interface item {
    name: string,
    quantity: number,
    price: number,
    total: number
}

export interface invoice {
    id:string,
    createdAt:Date,
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

export default function NewInvoice(props:props) {
  const {isNewInvoiceOpen} = props

  if(!isNewInvoiceOpen) return null;

  const dispatch = useDispatch()

  //useRefs
  const refForm = useRef(null)
  const refButtons = useRef(null)
  const wrapperRef = useRef(null)
  const paymentOptionsRef = useRef(null)
  const paymentWrapper = useRef(null)


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
    setInvoiceData((prevData)=>{
        return {
            ...prevData,
            items:[
                ...prevData.items,
                {
                    name:"",
                    quantity:0.00,
                    price:0.00,
                    total:0.00
                }
            ]
        }
    })
    const form = refForm.current
    setTimeout(
        ()=>{
            // @ts-ignore: Object is possibly 'null'.
            form.scroll({top:form.scrollHeight,behavior:'smooth'})
        },0
    )
  }
  function selectPayment(paymentTerms:number){
    setInvoiceData(prevData=>({
        ...prevData,
        paymentTerms:paymentTerms,
    }))
    togglePayment(false)
  }
  function onChangeHandler(e:FormEvent){
    const {name,value} = e.target as HTMLButtonElement

    if(name.includes('.')){
        const [first,second] = name.split('.')
        setInvoiceData(prevData=>({
            ...prevData,
            [first === 'senderAddress' ? 'senderAddress' : 'clientAddress']:{
                ...prevData[first === 'senderAddress' ? 'senderAddress' : 'clientAddress'],
                [second]:value
            }
        })) 
        return;
    }
    
    setInvoiceData(prevData=>({
        ...prevData,
        [name]:value
    }))
  }
  function onSubmitHandler(message:string){
    //pending
    setAuthFeedbackData({status:'pending',message:message})
    
    //validate-data
    if(validateInvoiceData(invoiceData).status === 'error'){
        setTimeout(()=>setAuthFeedbackData(validateInvoiceData(invoiceData)),100)
        return;
    }
    
    //pending
    setAuthFeedbackData({status:'pending',message:message})

    //send data to database

    if(false){
        setAuthFeedbackData({status:'error',message:'feedback-error-message'})
    }else{
        setAuthFeedbackData({status:'succes',message:'feedback-succes-message'})
    }

  }

  //inline-styles
  const borderColor = {
    borderColor:'#9277FF'
  }

  useEffect(()=>{

    function toggleOff(e:FormEvent){
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


  //state
  const [isPaymentOpen,togglePayment] = useState(false)
  const [invoiceData,setInvoiceData] = useState({
    id:`${nanoid().slice(0,6).toUpperCase()}`,
    createdAt:new Date(),
    paymentDue: "",
    description: "",
    paymentTerms: 14,
    clientName: "",
    clientEmail: "",
    status: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: ""
    },
    items: [
        {
            name: "",
            quantity: 0,
            price: 0,
            total:0
        }
    ],
    total: 0.00
  })
  const [authFeedbackData,setAuthFeedbackData] = useState({})
  console.log('state',authFeedbackData)
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
                {
                    Object.keys(authFeedbackData).length !== 0 && 
                    <AuthFeedback data={authFeedbackData} />
                }
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
                                name={'senderAddress.street'}
                                value={invoiceData.senderAddress.street}
                                onChange={onChangeHandler}
                            />
                            <Input 
                                label='City'
                                customStyles={styles.city}
                                name={'senderAddress.city'}
                                value={invoiceData.senderAddress.city}
                                onChange={onChangeHandler}
                            />
                            <Input 
                                label='Post Code'
                                customStyles={styles.post_code}
                                name={'senderAddress.postCode'}
                                value={invoiceData.senderAddress.postCode}
                                onChange={onChangeHandler}
                            />
                            <Input 
                                label='Country'
                                customStyles={styles.country}
                                name={'senderAddress.country'}
                                value={invoiceData.senderAddress.country}
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className={`${styles.to}`} >
                        <p className={`${styles.section_title}`} >Bill To</p>
                        <div className={`${styles.to_inputs}`} >
                            <Input 
                                label="Client's Name"
                                customStyles={styles.client_name}
                                name={'clientName'}
                                value={invoiceData.clientName}
                                onChange={onChangeHandler}
                            />
                            <Input 
                                label="Client's Email"
                                customStyles={styles.client_email}
                                name={'clientEmail'}
                                value={invoiceData.clientEmail}
                                onChange={onChangeHandler}
                            />
                            <Input 
                                label='Street Address'
                                customStyles={styles.client_street_address}
                                name={'clientAddress.street'}
                                value={invoiceData.clientAddress.street}
                                onChange={onChangeHandler}
                            />
                            <Input 
                                label='City'
                                name={'clientAddress.city'}
                                value={invoiceData.clientAddress.city}
                                onChange={onChangeHandler}
                            />
                            <Input 
                                label='Post Code'
                                name={'clientAddress.postCode'}
                                value={invoiceData.clientAddress.postCode}
                                onChange={onChangeHandler}
                            />
                            <Input 
                                label='Country'
                                customStyles={styles.client_country}
                                name={'clientAddress.country'}
                                value={invoiceData.clientAddress.country}
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className={`${styles.other_infos}`} >
                        <Input 
                            label={'Invoice Date'}
                            type={'date'}
                            customStyles={`${styles.date} date`}
                            name={'paymentDue'}
                            value={invoiceData.paymentDue}
                            onChange={onChangeHandler}
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
                                    <p>{`Net ${invoiceData.paymentTerms} Day${invoiceData.paymentTerms === 1 ? '' : 's'}`}</p>
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
                            name={'description'}
                            value={invoiceData.description}
                            onChange={onChangeHandler}
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
                            invoiceData.items.map((item,index)=>(
                                <Item 
                                    key={index}
                                    itemData={item} 
                                    writeHandler={(index:number,name:string,value:string|number)=>{
                                        setInvoiceData((prevData:invoice):invoice=>{
                                            return {
                                                ...prevData,
                                                items:prevData.items.map((item:item,index2)=>index2 === index ? {
                                                    ...item,
                                                    [name]:value
                                                } : item)
                                            }
                                        })
                                    }}
                                    deleteHandler={(index:number)=>{
                                        setInvoiceData((prevData:invoice):invoice=>{
                                            return {
                                                ...prevData,
                                                items:prevData.items.filter((item:item,index2:number)=>index2 !== index)
                                            }
                                        })
                                    }

                                    }
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
                    <button 
                        className={`${styles.reverse_normal_button}`} 
                        onClick={onCancelHandler}
                    >
                        Discard
                    </button>
                    <button 
                        className={`${styles.save}`} 
                        onClick={()=>{
                            //set-status
                            setInvoiceData(prevData=>({
                                ...prevData,
                                status:'draft',
                            }))

                            //submitData
                            onSubmitHandler('Saving as Draft')
                        }}
                    >
                        Save as Draft
                    </button>
                    <button 
                        className={`purple_button`} 
                        onClick={()=>{
                            //set-status
                            setInvoiceData(prevData=>({
                                ...prevData,
                                status:'pending',
                            }))

                            //submitData
                            onSubmitHandler('Sending Invoice')
                        }}
                    >Save & Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}
