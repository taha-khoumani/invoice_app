import React from 'react'

//styles
import styles from "@/styles/css/AuthFeedback.module.css"

interface props {
    data: {
        status?:string,
        message?:string,
    }
}

export default function AuthFeedback(props:props) {
  const {data} = props

  if(!data.status || !data.message) return null;

  const {status,message} = data

  function decideIcon(status:string){
    switch(data.status){
      case 'succes':
        return <i className="fa-regular fa-circle-check"></i>
      break;
      case 'error':
        return <i className="fa-solid fa-circle-exclamation"></i>
      break
      case 'pending':
        return <i className="fa-solid fa-spinner"></i>
      break
    }
    
  }

  return (
    <div className={`${styles[status]} auth_feedback`} id='feedback' >
      <div>
        {decideIcon(status)}
      </div>
      <p>{message}</p>
    </div>
  )
}