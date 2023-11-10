import express from "express";
import { validateAdmin } from "../middlewares/authMiddleware.js";
import {
    adminLogin,
    logout,
    addAppintmentAsAdmin,
    assignWorker,
    addServiceChargeAndChangeStatus
} from "../controllers/admin.controller.js"

const router = express.Router();

router.post("/login", adminLogin);
router.get(`/logout`, validateAdmin, logout);
router.post("/appointment/add", validateAdmin, addAppintmentAsAdmin);
router.put("/assign/worker/:id", validateAdmin, assignWorker);
router.put("/add/amount/:id", validateAdmin, addServiceChargeAndChangeStatus)


export default router;

