//database
import { MongoClient } from "mongodb";

//helper-functions
import { validateInvoiceData } from "@/lib/functions";

//auth
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from "next";
import { invoice } from "@/lib/types";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        invoiceData:invoice,
        userEmail:string,
    };
}

export default async function handler (req:ExtendedNextApiRequest,res:NextApiResponse){
    try{
        //methode validation
        if(req.method !== 'PATCH'){
            res.status(405).json({status:405,message:'This is suposed to be a PATCH request.'})
            return null;
        }
    
        //auth validation
        const session = await getServerSession(req, res, authOptions)
        if(!session){
            res.status(405).json({status:405,message:"You have to Sign In before posting an invoice."})
            return null;
        }
    
        const {invoiceData,userEmail} = req.body
        
        const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
        const users = client.db('invoice').collection("users")

        //if user owns the invoice that they want to delete
        const userOwnsInvoice = await users.findOne({'userData.email':userEmail,'invoices.id':invoiceData.id})
        if(!userOwnsInvoice){
            res.status(405).json({status:405,message:"You don't own this invoice."})
            return null;
        }

        if(validateInvoiceData(invoiceData).status === 'error'){
            res.status(400).json({status:400,message:validateInvoiceData(invoiceData).message})
            return null;
        }
    
        //find-document
        const findResult = await users.findOne({'userData.email':userEmail})
        const oldInvoices = findResult?.invoices
        const newInvoice = oldInvoices.map((invoice:invoice)=> invoice.id === invoiceData.id ? invoiceData : invoice)

        //insert the data
        const addResult = await users.updateOne({'userData.email':userEmail},{$set:{'invoices':newInvoice}})

        res.status(200).json({status:200,message:'Invoice edited succesefully'})
        client.close()

    } catch (err){
        res.status(400).json({ err: "Error!" });
    }

}

    