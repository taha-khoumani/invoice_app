//database
import { MongoClient } from "mongodb";

//helper-functions
import { validateInvoiceData } from "@/lib/functions";

//auth
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from "next";

interface item {
    name: string,
    quantity: number,
    price: number,
    total: number
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

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        invoiceData:invoice,
        userEmail:string,
    };
}

export default async function handler (req:ExtendedNextApiRequest,res:NextApiResponse){
    try{
        //methode validation
        if(req.method !== 'POST'){
            res.status(405).json({status:405,message:'This is suposed to be a POST request.'})
            return null;
        }
    
        // auth validation
        const session = await getServerSession(req, res, authOptions)
        if(!session){
            res.status(405).json({status:405,message:"You have to Sign In before posting an invoice."})
            return null;
        }
    
        const {invoiceData,userEmail} = req.body
    
        //check if the data is valid
        if(validateInvoiceData(invoiceData).status === 'error'){
            res.status(400).json({status:400,message:validateInvoiceData(invoiceData).message})
            return null;
        }

        const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
        const users = client.db('invoice').collection("users")

        //find-document
        const findResult = await users.findOne({'userData.email':userEmail})
        const oldInvoices = findResult?.invoices

        //insert the data
        const addResult = await users.updateOne({'userData.email':userEmail},{$set:{'invoices':[...oldInvoices,invoiceData]}})

        res.status(200).json({status:200,message:'Invoice added succesefully'})
        client.close()

    } catch (err){
        res.status(403).json({ err: "Error!" });
    }
}