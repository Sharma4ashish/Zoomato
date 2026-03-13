import dotenv from "dotenv"
import express from "express"
dotenv.config()

const app = express()


app.listen(5002,()=>{
    console.log("listend")
    
})