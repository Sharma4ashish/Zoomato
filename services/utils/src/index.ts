import express from "express"
import dotenv from "dotenv"
import cloudinary from "cloudinary"
import cors from "cors";
import uploadRoutes from "./routes/cloudinary.js";
dotenv.config()


const PORT = process.env.PORT || 5003
const app = express()

app.use(cors())

app.use(express.json({
    limit:"50mb"
}))

app.use(express.urlencoded({
    limit:"50mb",
    extended:true
}))


const cloudinaryConfigs = {
    CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_CLOUD_APIKEY:process.env.CLOUDINARY_CLOUD_APIKEY,
    CLOUDINARY_CLOUD_SECRET:process.env.CLOUDINARY_CLOUD_SECRET
}
// console.log(cloudinaryConfigs);

if(!cloudinaryConfigs.CLOUDINARY_CLOUD_APIKEY || !cloudinaryConfigs.CLOUDINARY_CLOUD_NAME || !cloudinaryConfigs.CLOUDINARY_CLOUD_SECRET){
    throw new Error("Missing Cloudinary Configs");  
} 

cloudinary.v2.config({
    cloud_name:cloudinaryConfigs.CLOUDINARY_CLOUD_NAME,
    api_key:cloudinaryConfigs.CLOUDINARY_CLOUD_APIKEY,
    api_secret:cloudinaryConfigs.CLOUDINARY_CLOUD_SECRET
})

app.use("/api",uploadRoutes);



app.listen(PORT, ()=>{
    console.log("UTILs service running at ", PORT);
})