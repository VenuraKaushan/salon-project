import express from "express";
import { validateAdmin } from "../middlewares/authMiddleware.js";
import {adminLogin,logout} from "../controllers/admin.controller.js"

const router = express.Router();

router.post("/login", adminLogin);
router.get(`/logout`,validateAdmin,logout);



export default router;
 
