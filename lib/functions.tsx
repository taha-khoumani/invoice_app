export function setModaleStyles (isModal:boolean){
    if(isModal){
        document.body.style.position = 'fixed'
    } else{
        document.body.style.position = 'static'
    }
}

interface invoice {
    id:string,
    createdAt:string,
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

    //Draft case
    if(status === 'draft') return responsBuilder(1,'Validated Succefully.')

    //Validation
        //sender
            //street
            if(isEmpty(s_street)){
                return responsBuilder(0,'Sender street Address is required.')
            }

            //city
            if(isEmpty(s_city)){
                return responsBuilder(0,'Sender City is required.')
            }

            //post-code
            if(isEmpty(s_postCode)){
                return responsBuilder(0,'Sender postcode is required.')
            }

            //country
            if(isEmpty(s_country)){
                return responsBuilder(0,'Sender Country is required.')
            }


        //client
            //name
            if(isEmpty(clientName)){
                return responsBuilder(0,"Client's name is required.")
            }

            //email
            if(isEmpty(clientEmail)){
                return responsBuilder(0,'Client Email is required.')
            }
            if(!/.+@.+\..+/.test(clientEmail)){
                return responsBuilder(0,'Client Email should be in the right format.')
            }

            //street
            if(isEmpty(c_street)){
                return responsBuilder(0,'Client street Address is required.')
            }

            //city
            if(isEmpty(c_city)){
                return responsBuilder(0,'Client City is required.')
            }

            //post-code
            if(isEmpty(c_postCode)){
                return responsBuilder(0,'Client post code is required.')
            }

            //country
            if(isEmpty(c_country)){
                return responsBuilder(0,'Client Country is required.')
            }

        //other-details
            //date
            if(isEmpty(paymentDue)){
                return responsBuilder(0,'The Invoice Date is required.')
            }

            //descriptions
            if(isEmpty(description)){
                return responsBuilder(0,'Invoice description is required.')
            }

        //items
            //item-name
            if(items.some(item=>isEmpty(item.name))){
                return responsBuilder(0,'All Items Names are required.')
            }

            //item-quantity
            if(items.some(item=>item.quantity === 0)){
                return responsBuilder(0,'All Items quantity are required.')
            }

            //item-price
            if(items.some(item=>item.price === 0)){
                return responsBuilder(0,'All Items Prices are required.')
            }


    //else
    return responsBuilder(1,'Validated Succefully');
}

export function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${monthNames[Number(month) - 1]} ${year}`;
}