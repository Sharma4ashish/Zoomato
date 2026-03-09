import { Document, model, Schema } from "mongoose";

export interface Iuser extends Document {
    name:String;
    email:String;
    image:String;
    role:String;
}



const userSchema:Schema<Iuser> = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:null,
    }


})


const User =  model<Iuser>("User",userSchema);

export default User