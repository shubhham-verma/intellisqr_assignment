import mongoose from "mongoose";

let isConnected = false;

export async function connectDB(){

    if(isConnected)
        return;

    const uri = process.env.MONGO_URI as string;
    
    if(!uri) throw new Error("Mongo URI not found!!");

    await mongoose.connect(uri);
    isConnected =true;

}