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
    onInput?:(e:FormEvent)=>void,
    ref?:React.MutableRefObject<null>,
    onChange?:(e:FormEvent)=>void,
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
}

export default function Input(props:props) {
    const {
        value,
        style,
        label,
        customStyles,
        size,
        type,
        min,
        onInput,
        name,
        ref,
        onChange,
        onKeyDown
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
            ref={ref}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    </div>
  )
}
