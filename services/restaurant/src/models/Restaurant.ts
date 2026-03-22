import mongoose, { Schema } from "mongoose";

export interface IRestaurant{
    name:string,
    image:string;
    ownerId:string;
    description?:string;
    phone:string;
    isVerified:boolean;

    autoLocation:{
        type:"Point";
        coordinates:[number,number]; //[log, lat]
        formatedAddress:string
    };

    isOpen:boolean;
    createdAt:Date;
}

const restaurantSchema = new mongoose.Schema<IRestaurant>({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String
    },
    image:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    ownerId:{
        type:String,
        required:true
    },
    autoLocation:{
        type:{
            type:String,
            enum:["Point"],
            required:true,
        },
        coordinates:{
            type:[Number],
            required:true,
        },
        formatedAddress:{
            type:String
        }
    },
    isOpen:{
        type:Boolean,
        default:false,
    }

},{timestamps:true})

restaurantSchema.index({
    autoLocation:"2dsphere"
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant",restaurantSchema)

export default Restaurant