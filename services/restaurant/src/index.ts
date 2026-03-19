import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import restauratnRoutes from "./routes/restaurant"

dotenv.config()


const PORT = process.env.PORT || 5002;

const app = express()

app.use(cors())

app.use("/api/restaurant", restauratnRoutes)


app.listen(PORT,()=>{
    console.log("listend")
    
})