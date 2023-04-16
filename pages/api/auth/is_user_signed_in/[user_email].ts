//database
import { MongoClient } from "mongodb";

//auth
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req:NextApiRequest,res:NextApiResponse){
    try{
        //methode validation
        if(req.method !== 'GET'){
            res.status(405).json({status:405,message:'This is suposed to be a GET request.'})
            return null;
        }
    
        //auth validation
        // const session = await getServerSession(req, res, authOptions)
        // if(!session){
        //     res.status(405).json({status:405,message:"You have to Sign In before posting an invoice."})
        //     return null;
        // }
    
        const userEmail = req.query.user_email
        
        const client = await MongoClient.connect(`mongodb+srv://tagopi:${'DGakye2AgwDd8v2a'}@cluster0.8kpmakb.mongodb.net/?retryWrites=true&w=majority`)
        const invoices = client.db('invoice').collection("users")
    
        // insert the data
        const result = await invoices.findOne({'userData.email':userEmail})
        res.status(200).json(result !== null)
        client.close()

    } catch (err){
        res.status(403).json({ err: "Error!" });
    }
}