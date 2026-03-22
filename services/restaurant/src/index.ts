import dotenv from "dotenv"
import express, { urlencoded } from "express"
import cors from "cors"
import restauratnRoutes from "./routes/restaurant"
import connectDB from "./config/db"

dotenv.config()
connectDB()

const PORT = process.env.PORT || 5002;

const app = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded())

app.use("/api/restaurant", restauratnRoutes)


app.listen(PORT,()=>{
    console.log("Restaurant service listening to", PORT)
    
})