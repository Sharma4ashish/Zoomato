import express from "express"
import { adduserRole, loginController, myProfile } from "../controllers/auth.js"
import { isAuth } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/login", loginController)
router.put("/add/role", isAuth, adduserRole)
router.get("/me", isAuth, myProfile)

export default router