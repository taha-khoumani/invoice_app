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
    </div>
  )
}
