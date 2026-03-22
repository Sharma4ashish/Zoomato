import express from "express"
import { addRestraunt, fetchMyRestaurant } from "../controllers/restaurant"
import { isAuth, isSeller } from "../middlewares/isAuth";
import uploadFile from "../middlewares/multer";

const router = express.Router()

router.post("/new",isAuth, isSeller, uploadFile, addRestraunt);
router.get("/my",isAuth, isSeller, fetchMyRestaurant);

export default router



