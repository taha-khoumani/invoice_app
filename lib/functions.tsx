export function setModaleStyles (isModal:boolean){
    if(isModal){
        document.body.style.position = 'fixed'
    } else{
        document.body.style.position = 'static'
    }
}

interface invoice {
    id:string,
    createdAt:Date,
    paymentDue:string,
    description:string,
    paymentTerms: number,
    clientName:string,
    clientEmail:string,
    status:string,
    senderAddress: {
      street:string,
      city:string,
      postCode:string,
      country:string
    },
    clientAddress: {
      street:string,
      city:string,
      postCode:string,
      country:string
    },
    items: item[],
    total: number
}

interface item {
    name: string,
    quantity: number,
    price: number,
    total: number
}

export function validateInvoiceData(invoiceData:invoice){
    //functions
    function isEmpty(string:string){
        return string === "" || string.trim() === ""
    }

    function responsBuilder(status:number,message:string){
        const returnedStatus = status === 0 ? 'error' : 'succes'
        return {
            status:returnedStatus,
            message,
        }
    }

    //if not data
    if(!invoiceData) return responsBuilder(0,'No Data received.');

    //data-extraction
    const {
        paymentDue,
        description,
        paymentTerms,
        clientName,
        clientEmail,
        status,
        senderAddress,
        clientAddress,
        items,
    } = invoiceData
    const {
        street:s_street,
        city:s_city,
        postCode:s_postCode,
        country:s_country
    } = senderAddress
    const {
        street:c_street,
        city:c_city,
        postCode:c_postCode,
        country:c_country
    } = clientAddress

    //Validation
        //sender
            //street
            if(isEmpty(s_street)){
                return responsBuilder(0,'Sender street Address is required.')
            }



    //else
    return responsBuilder(1,'Validated Succefully');
}