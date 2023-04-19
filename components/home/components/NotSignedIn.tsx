import PopModul from '@/components/ui/PopModul';
import { setModaleStyles } from '@/lib/functions';
import { toggleNotSignedInModule } from '@/redux/slices/uiSlice';
import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import styles from '@/styles/css/DeleteModul.module.css';
import { signIn } from 'next-auth/react';

type Props = {
    isNotSignedInModuleOpen:boolean
}

export default function NotSignedIn({isNotSignedInModuleOpen}: Props) {
    const dispatch = useDispatch()

    if(!isNotSignedInModuleOpen) return null;

    function onCancelHandler(){
        setModaleStyles(false)
        dispatch(toggleNotSignedInModule(false))
    }

    function onSignInHandler(){
        signIn('google')
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
            <p className={`${styles.title}`} >You have to sign in.</p>
            <p className={`${styles.description}`} >Before creating a new invoice, you have to Login.</p>
            <div className={`${styles.buttons}`} >
                    <button className={`${styles.save}`} onClick={onCancelHandler}>Cancel</button>
                    <button onClick={onSignInHandler} className={`purple_button`} >Sign in</button>
            </div>
        </div>
    </PopModul>
  )
}