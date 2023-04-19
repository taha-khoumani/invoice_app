import Image from 'next/image'
import React, { FormEvent, useEffect } from 'react'
import navbar_logo from '@/public/navbar_logo.png'
import styles from '@/styles/css/Navbar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '@/redux/slices/uiSlice'

import DATA from "@/data.json"
import { signIn, signOut, useSession } from 'next-auth/react'

interface RootState {
    ui: {
        theme:string
    }
}

export default function Navbar() {
    const dispatch = useDispatch()
    const {theme} = useSelector((store:RootState)=>store.ui)
    const {data,status} = useSession()
    
    function sendAll(){
        // return;
        DATA.forEach(async function (invoice){
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
    function handleToggleTheme (e:FormEvent){
        dispatch(setTheme(theme === 'light' ? 'dark': 'light'))
    }
    function onAuthHandler(){
        if(status === "unauthenticated"){
            signIn('google')
        } else if(status === "authenticated"){
            signOut()
        }
    }

    useEffect(()=>{
        (async()=>{
            if(status !== 'authenticated')return;

            const jsonResult = await fetch(`api/auth/is_user_signed_in/${data.user?.email}`)
            const result =  await jsonResult.json()

            if(result){

            }else{
                const jsonResult = await fetch(`api/auth/register_user`,{
                    method: 'POST',
                    body: JSON.stringify ({
                        userData:data.user
                    }),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                })
                const result =  await jsonResult.json()
            }
        })()
    },[status])

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
            <div className={styles.auth_icon}>
                <i 
                    className={`fa-solid fa-right-${status === 'authenticated' ? 'from' : 'to'}-bracket`}
                    onClick={onAuthHandler}
                >
                </i>
                <p> { status === 'authenticated' ? 'sign out' : 'sign in' } </p>
            </div>
            <hr />
            <i 
                className={`fa-solid fa-${theme === 'dark' ? "moon":'sun'}`}
                onClick={handleToggleTheme}
            >
            </i>
            {
                status === 'authenticated' &&
                <div className={styles.profile}>
                    <Image 
                        src={
                            status === 'authenticated' && data.user && data.user.image ?
                            data.user.image :
                            '/image-avatar.jpg'
                        }
                        alt='s'
                        width={40}
                        height={40}
                        onClick={()=>{
                            console.log(data)
                        }}
                    />
                </div>
            }
        </div>
    </div>
  )
}
