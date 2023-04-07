import React, { FormEvent } from 'react'
import styles from '@/styles/css/TextInput.module.css'

interface props{
    label:string | false,
    customStyles?:string;
    size?:number,
    type?:string,
    style?:object,
    min?:number,
    name?:string,
    value?:string|number,
    onInput?:(e:FormEvent)=>void
}

export default function TextInput(props:props) {
    const {
        value,
        style,
        label,
        customStyles,
        size,
        type,
        min,
        onInput,
        name
    } = props

  return (
    <div className={`${styles.input_wrapper} ${customStyles}`} >
        {
            label  &&
            <label 
                className={`input_label`} 
                // htmlFor=""
            >
                {label}
            </label>
        }
        <input 
            size={size ? size : 1}
            type={type ? type : "text" }
            className={`input_input`}
            style={style}
            name={name}
            min={min}
            data-oninput={oninput}
            value={value}
            onInput={onInput}
        />
    </div>
  )
}
