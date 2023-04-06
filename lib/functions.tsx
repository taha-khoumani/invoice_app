

export function setModaleStyles (isModal:boolean){
    if(isModal){
        document.body.style.position = 'fixed'
    } else{
        document.body.style.position = 'static'
    }
}