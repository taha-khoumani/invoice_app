import Image from 'next/image'
import React from 'react'
import navbar_logo from '@/public/navbar_logo.png'
import styles from '@/styles/css/Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.navbar} >
        <Image 
            property='true' 
            src={navbar_logo} 
            alt={'navbar_logo'} 
            className={styles.navbar_logo}  
        />
        <div className={styles.navbar_theme__profile} >
            <i className={`fa-solid fa-${false? "moon":'sun'}`}></i>
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
