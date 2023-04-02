import Image from 'next/image'
import React, { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useRef } from 'react'
import plus from '../../../public/icon-plus.svg'
import styles from '@/styles/css/HomeHeader.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toggleFilter ,setFilter} from '@/redux/slices/uiSlice'

interface RootStore {
  ui:{
    isFilterOn:boolean
    filter:string
  },
  invoices:{
    invoices:object[]
  }
}

export default function HomeHeader() {
  const dispatch = useDispatch() 
  const {isFilterOn,filter} = useSelector((store:RootStore)=>store.ui)
  const {invoices} = useSelector((store:RootStore)=>store.invoices)

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

  return (
    <div className={styles.header} >
        <div className={styles.read} >
            <h1>Invoices</h1>
            <p>
              <span>There are&nbsp;</span>
              {invoices.length} 
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
          <button className={`${styles.write_new} purple_button plus_button`}>
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
