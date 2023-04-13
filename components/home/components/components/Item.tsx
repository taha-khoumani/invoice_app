import React, { FormEvent, InputHTMLAttributes, InsHTMLAttributes, KeyboardEvent, ReactEventHandler, SyntheticEvent, useEffect } from 'react'
import TextInput from './Input'
import styles from '@/styles/css/Item.module.css'
import { type } from 'os'

interface props{
  index:number,
  itemData:{
    name:string,
    quantity:number,
    price:number,
    total:number,
  }
  writeHandler?:(index: number, name: string, value: string | number)=>void
  deleteHandler?:(index:number)=>void
}

export default function Item(props:props) {
  const {itemData,writeHandler,index,deleteHandler} = props
  const {name,quantity,price,total} = itemData

  function onDeleteHandler(){
    if(deleteHandler){
      deleteHandler(index)
    }
  }

  function onInputHandler(e:FormEvent){
    const { name,value } = e.target as HTMLButtonElement;
    if(writeHandler){
      writeHandler(index,name,value)
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    // Check if the key pressed is a minus sign
    if (key === "-") {
      // If it's a minus sign, prevent default behavior
      event.preventDefault();
    }
  };

  //calculate_total
  useEffect(()=>{
    if(writeHandler){
      writeHandler(index,'total',price*quantity)
    }
  },[price,quantity])

  return (
    <div className={`${styles.item}`} >
      <TextInput 
          label={'Item Name'}
          customStyles={styles.name}
          value={name}
          name={'name'}
          onInput={onInputHandler}
      />
      <TextInput 
          label={'Qty.'}
          customStyles={styles.qty}
          type={'number'}
          min={1}
          style={{
            paddingRight:'10px',
            paddingLeft:'10px',
          }}
          value={quantity === 0 ? '' : quantity}
          name={'quantity'}
          onInput={onInputHandler}
          onKeyDown={handleKeyDown}
      />
      <TextInput
          label={'Price'}
          type={"number"}
          customStyles={`${styles.price}`}
          value={price === 0 ? '': price}
          size={1}
          name={'price'}
          onInput={onInputHandler}
          onKeyDown={handleKeyDown}
      />
      <div className={`${styles.total}`}>
          <label className='item_total' >Total</label>
        <p  >{`${total}$`}</p>
      </div>
      <i 
        className="fa-solid fa-trash"
        onClick={onDeleteHandler}
      >
      </i>
    </div>
  )
}
