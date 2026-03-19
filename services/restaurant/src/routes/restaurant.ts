import express from "express"
import { addRestraunt } from "../controllers/restaurant"

const router = express.Router()

router.post("/new",addRestraunt);

export default router



