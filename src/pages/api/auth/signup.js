import { hashPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

async function handler(req,res){
    

    if(req.method==='POST'){
        return 

    }
        
        const data = req.body;

        const {email,password}=data;
    
        if(!email || !email.includes('@') || !password || password.trim().length<7){
            res.status(422).json({message:'invalid input-password should also  be atleast 7 characters long.'})
            return;
        }
        const client = await connectToDatabase();
    
        const db = client.db();

        const existingUser=await db.collection('users').findOne({email:email})

        if(existingUser){
            res.stats(422).json({message:'user existing already!'})
            client.close();
            return;
        }
    
        const hashedPassword =await hashPassword(password)
    
        const result= db.collection('users').insertOne({
            email: email,
            password: hashedPassword
        })
        res.status(201).join({message:'Created user!'})  
        client.close();


}
export default handler;