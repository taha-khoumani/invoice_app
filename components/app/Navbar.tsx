import Image from 'next/image'
import React, { FormEvent } from 'react'
import navbar_logo from '@/public/navbar_logo.png'
import styles from '@/styles/css/Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '@/redux/slices/uiSlice'

import data from "@/data.json"

interface RootState {
    ui: {
        theme:string
    }
}

export default function Navbar() {
    const dispatch = useDispatch()
    const {theme} = useSelector((store:RootState)=>store.ui)
    
    function handleToggleTheme (e:FormEvent){
        dispatch(setTheme(theme === 'light' ? 'dark': 'light'))
    }

    function sendAll(){
        // return;
        data.forEach(async function (invoice){
            const jsonResult = await fetch('/api/createInvoice',{
                method: 'POST',
                body: JSON.stringify ({
                    invoiceData:invoice
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            const result = await jsonResult.json()
        })
    }

  return (
    <div className={styles.navbar} >
        <Image 
            property='true' 
            src={navbar_logo} 
            alt={'navbar_logo'} 
            className={styles.navbar_logo}  
            onClick={sendAll}
        />
        <div className={styles.navbar_theme__profile} >
            <i 
                className="fa-solid fa-right-to-bracket"
            >
            </i>
            <hr />
            <i 
                className={`fa-solid fa-${theme === 'dark' ? "moon":'sun'}`}
                onClick={handleToggleTheme}
            >
            </i>
            <div className={styles.profile}>
                <Image 
                    src={'/image-avatar.jpg'}
                    alt='s'
                    width={40}
                    height={40}
                />
            </div>
        </div>
    </div>
  )
}
