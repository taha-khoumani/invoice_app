import React, { FormEvent, SyntheticEvent } from 'react'
import PopModul from '../ui/PopModul'
import styles from '@/styles/css/DeleteModul.module.css'
import { useSelector } from 'react-redux'
import { setModaleStyles } from '@/lib/functions'
import { useDispatch } from 'react-redux'
import { toggleDeleteModule } from '@/redux/slices/uiSlice'

interface props{
    id:string
}

interface store{
    ui:{
        isDeleteModuleOpen:boolean
    }
}

export default function DeleteModul(props:props) {
    const {isDeleteModuleOpen} = useSelector((store:store)=>store.ui)
    const dispatch = useDispatch()

    if(!isDeleteModuleOpen) return null;

    function onCancelHandler(){
        setModaleStyles(false)
        dispatch(toggleDeleteModule(false))
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
            onClick={onCancelHandler}
        >
            <p className={`${styles.title}`} >Confirm Deletion</p>
            <p className={`${styles.description}`} >Are you sure you want to delete invoice #{props.id}? This action cannot be undone.</p>
            <div className={`${styles.buttons}`} >
                    <button 
                        className={`normal_button`} 
                        onClick={onCancelHandler}
                    >
                        Cancel
                    </button>
                    <button className={`delete_button`} >Delete</button>
                </div>
        </div>
    </PopModul>
  )
}
