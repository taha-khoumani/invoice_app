import React, { FormEvent, SyntheticEvent } from 'react'
import PopModul from '../ui/PopModul'
import styles from '@/styles/css/DeleteModul.module.css'
import { useSelector } from 'react-redux'
import { setModaleStyles } from '@/lib/functions'
import { useDispatch } from 'react-redux'
import { toggleDeleteModule } from '@/redux/slices/uiSlice'
import { useRouter } from 'next/router'

interface props{
    id:string
}

interface store{
    ui:{
        isDeleteModuleOpen:boolean
    }
}

export default function DeleteModul(props:props) {
    const {id} = props
    const {isDeleteModuleOpen} = useSelector((store:store)=>store.ui)
    const dispatch = useDispatch()
    const router = useRouter()

    if(!isDeleteModuleOpen) return null;

    function onCancelHandler(){
        setModaleStyles(false)
        dispatch(toggleDeleteModule(false))
    }
    async function onDeleteHandler(){
        router.push('/')
        onCancelHandler()
        const jsonResult = await fetch('/api/deleteInvoice',{
            method: 'DELETE',
            body: JSON.stringify ({
                invoiceID:id
            }),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        const result = await jsonResult.json()
    }

  return (
    <PopModul
        onWraperClick={onCancelHandler}
        onContentClick={(e:FormEvent)=>{ 
            e.stopPropagation() /// it won't stop propagation ?
        }}
    >
        <div 
            className={`${styles.deleteWrapper}`} 
            onClick={(e)=>{onCancelHandler;e.stopPropagation()}}
        >
            <p className={`${styles.title}`} >Confirm Deletion</p>
            <p className={`${styles.description}`} >Are you sure you want to delete invoice #{props.id}? <br/> This action cannot be undone.</p>
            <div className={`${styles.buttons}`} >
                    <button className={`normal_button`} onClick={onCancelHandler}>Cancel</button>
                    <button onClick={onDeleteHandler} className={`delete_button`} >Delete</button>
                </div>
        </div>
    </PopModul>
  )
}
