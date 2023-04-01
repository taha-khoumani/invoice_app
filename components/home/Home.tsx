import React from 'react'
import HomeHeader from './components/HomeHeader'
import HomeMain from './components/HomeMain'
import styles from '@/styles/css/Home.module.css'

export default function Home() {
  return (
    <div className={styles.home} >
        <div className={styles.home_components_wraper} >
            <HomeHeader/>
            <HomeMain/>
        </div>
    </div>
  )
}
