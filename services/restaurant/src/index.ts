import dotenv from "dotenv"
import express from "express"
import cors from "cors"
dotenv.config()


const PORT = process.env.PORT || 5002;

const app = express()

app.use(cors())


app.listen(PORT,()=>{
    console.log("listend")
    
})