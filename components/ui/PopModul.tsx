import React, { FormEvent, ReactNode } from 'react'
import styles from '@/styles/css/PopModul.module.css'

type props = {
    children:ReactNode
    onWraperClick:()=>void,
    onContentClick:(e:FormEvent)=>void,
  }

export default function PopModul(props:props) {
  const {children,onWraperClick,onContentClick} = props
  return (
    <div className={`${styles.module}`} onClick={onWraperClick} >
        <div onClick={onContentClick} className={`${styles.content} content`} >
            {children}
        </div>
    </div>
  )
}
