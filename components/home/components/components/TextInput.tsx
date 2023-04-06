import React, { FormEvent } from 'react'
import styles from '@/styles/css/TextInput.module.css'

interface props{
    label:string,
    customStyles?:string;

    // onClick:(e:FormEvent)=>{

    // }
}

export default function TextInput(props:props) {
    const {label,customStyles} = props

  return (
    <div className={`${styles.input_wrapper} ${customStyles}`} >
        <label 
            className={`input_label`} 
            // htmlFor=""
        >
            {label}
        </label>
        <input 
            size={1}
            type="text" 
            className={`input_input`}
        />
    </div>
  )
}
