import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
dotenv.config();

const ConnectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("database connection sucessfully ")

    }catch(err){
        console.log("failed to connect databased",err);

    }
}
export default ConnectDB;