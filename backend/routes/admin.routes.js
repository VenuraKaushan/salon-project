import express from "express";
import { validateAdmin } from "../middlewares/authMiddleware.js";
import {adminLogin,logout,addAppintmentAsAdmin} from "../controllers/admin.controller.js"

const router = express.Router();

router.post("/login", adminLogin);
router.get(`/logout`,validateAdmin,logout);
router.post("/appointment/add",validateAdmin,addAppintmentAsAdmin)



export default router;
 
