import React, { useRef } from 'react'
import styles from '@/styles/css/NewInvoice.module.css'
import { useDispatch } from 'react-redux';
import { toggleNewInvoice } from '@/redux/slices/uiSlice';
import TextInput from './components/TextInput';
import { setModaleStyles } from '@/lib/functions';

interface props {
    isNewInvoiceOpen:boolean
}

export default function NewInvoice(props:props) {
  const {isNewInvoiceOpen} = props

  if(!isNewInvoiceOpen) return null;

  const refForm = useRef(null)
  const refButtons = useRef(null)

  const dispatch = useDispatch()

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
 
  return (
    <div 
        className={`${styles.write_invoice_first_wrapper}`}
        onClick={onCancelHandler}
    >
        <div 
            className={`${styles.write_invoice_second_wrapper} write`} 
            onClick={(e)=>e.stopPropagation()}
        >
            <div className={`${styles.write_invoice_second_half_wrapper}`} >
                <div 
                    ref={refForm} 
                    className={`${styles.write_invoice_third_wrapper}`}
                    onScroll={onScrollHandler}
                >
                    <p className={`${styles.title}`} >New Invoice</p>
                    <div className={`${styles.from}`} >
                        <p className={`${styles.section_title}`} >Bill From</p>
                        <div className={`${styles.from_inputs}`} >
                            <TextInput 
                                label='Street Address'
                                customStyles={styles.street_address}
                            />
                            <TextInput 
                                label='City'
                                customStyles={styles.city}
                            />
                            <TextInput 
                                label='Post Code'
                                customStyles={styles.post_code}
                            />
                            <TextInput 
                                label='Country'
                                customStyles={styles.country}
                            />
                        </div>
                    </div>
                    <div className={`${styles.to}`} >
                        <p className={`${styles.section_title}`} >Bill To</p>
                        <div className={`${styles.to_inputs}`} >
                            <TextInput 
                                label="Client's Name"
                                customStyles={styles.client_name}
                            />
                            <TextInput 
                                label="Client's Email"
                                customStyles={styles.client_email}
                            />
                            <TextInput 
                                label='Street Address'
                                customStyles={styles.client_street_address}
                            />
                            <TextInput 
                                label='City'
                            />
                            <TextInput 
                                label='Post Code'
                            />
                            <TextInput 
                                label='Country'
                                customStyles={styles.client_country}
                            />
                        </div>
                    </div>
                    <div>
                        <div >
                            <TextInput 
                                label='Project Description'
                            />
                        </div>
                    </div>
                    <div className={`${styles.items_wraper}`} >
                        <p className={`${styles.items_title}`} >Item List</p>
                    </div>
                </div>
                <div ref={refButtons} className={`${styles.buttons}`} >
                    <button className={`${styles.reverse_normal_button}`} >Discard</button>
                    <button className={`${styles.save}`} >Save as Draft</button>
                    <button className={`purple_button`} >Save & Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}
