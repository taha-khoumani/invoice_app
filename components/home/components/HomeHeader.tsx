import Image from 'next/image'
import React, { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import plus from '../../../public/icon-plus.svg'
import styles from '@/styles/css/HomeHeader.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toggleFilter ,setFilter, toggleNewInvoice} from '@/redux/slices/uiSlice'
import { setModaleStyles } from '@/lib/functions'
import { useSession } from 'next-auth/react'

interface RootStore {
  ui:{
    isFilterOn:boolean
    filter:string
  },
  invoices:{
    allInvoices:object[],
  }
}

interface Props{
  invoicesLength:number
}

export default function HomeHeader(props:Props) {
  const [invoicesLength,setInvoicesLength] = useState(props.invoicesLength)

  const dispatch = useDispatch() 
  const {isFilterOn,filter} = useSelector((store:RootStore)=>store.ui)
  const {allInvoices} = useSelector((store:RootStore)=>store.invoices)
  const {data,status} = useSession()

  function onToggleFilterHandler(e:FormEvent){
    dispatch(toggleFilter(!isFilterOn))
    e.stopPropagation()
  }

  function setFilterHandler(e:FormEvent){
    let target = e.target as HTMLInputElement;
    dispatch(setFilter(target.name))
    dispatch(toggleFilter(!isFilterOn))
    e.stopPropagation()
  }

  
  //close drop down on body click
  useEffect(()=>{
    function onBodyClickHandler(e:MouseEvent){
      const filterOptions = document.querySelector('.HomeHeader_filter_options__QpPRq')
      const clickedEl = e.target
      const label = document.querySelector('label')
      if(!filterOptions || clickedEl === filterOptions) return;
      dispatch(toggleFilter(false))
    }
    document.body.addEventListener('click',onBodyClickHandler,)
    return ()=> document.body.removeEventListener('click',onBodyClickHandler)
  },[])
  
  //update invoices length on change
  useEffect(()=>{
    setInvoicesLength(allInvoices.length)
  },[allInvoices.length])

  function onNewInvoiceHandler(){
    if(status === 'authenticated'){
      setModaleStyles(true)
      dispatch(toggleNewInvoice(true))
    }else if(status === 'unauthenticated'){
      alert('you have to sign in')
    }
  }

  return (
    <div className={styles.header} >
        <div className={styles.read} >
            <h1>Invoices</h1>
            <p>
              <span>There are&nbsp;</span>
              {invoicesLength} 
              <span>&nbsp;total</span> 
              &nbsp;invoices
            </p>
        </div>
        <div className={styles.write} >
          <div className={styles.write_filter_wrap}>
              <div 
                  className={styles.filter}
                  onClick={onToggleFilterHandler}
              >
                  <p className={styles.filter_text} >
                    Filter 
                    <span>&nbsp;by status</span>
                  </p>
                  <i className={`fa-sharp fa-solid fa-angle-${isFilterOn ? "up" : "down"}`}></i>
              </div>
              {
                  isFilterOn &&
                  <div onClick={(e)=>e.stopPropagation()} className={`${styles.filter_options} filter_options`}>
                    <div>
                      <input 
                        id='All' 
                        type="checkbox" 
                        name='All'
                        checked ={filter === 'All'}
                        onChange={setFilterHandler}
                      />
                      <label htmlFor="All">All</label>
                    </div>
                    <div>
                      <input 
                        id='Draft' 
                        type="checkbox" 
                        name='Draft'
                        checked ={filter === 'Draft'}
                        onChange={setFilterHandler}
                      />
                      <label htmlFor="Draft">Draft</label>
                    </div>
                    <div>
                      <input 
                        id='Pending' 
                        type="checkbox" 
                        name='Pending'
                        checked ={filter === 'Pending'}
                        onChange={setFilterHandler}
                      />
                      <label htmlFor="Pending">Pending</label>
                    </div>
                    <div>
                      <input 
                        id='Paid' 
                        type="checkbox" 
                        name='Paid'
                        checked ={filter === 'Paid'}
                        onChange={setFilterHandler}
                      />
                      <label htmlFor="Paid">Paid</label>
                    </div>
                  </div>
              }
          </div>
          <button 
            className={`${styles.write_new} purple_button plus_button`}
            onClick={onNewInvoiceHandler}
          >
            <Image src={plus} alt='plus' className='plus' />
            <span>
              New 
              <span className={styles.invoice} >&nbsp;Invoice</span>
            </span>
          </button>
        </div>
    </div>
  )
}
