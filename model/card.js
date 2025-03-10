import mongoose from "mongoose";

const cardShchema=new mongoose.Schema({
    name:{type:String,required:true},
    designation:{type:String,required:true},
    img: { type: String },
    dateOfExpire:{type:String,required:true},
    dateOfIssues:{type:String,required:true}
},{timestamps:true});

const Card=mongoose.model("Card",cardShchema);
export default  Card;