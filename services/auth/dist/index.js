import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.listen(PORT, () => {
    console.log(`Server Started on ${PORT} `);
    connectDB();
});
