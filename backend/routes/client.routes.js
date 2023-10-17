import express from "express";
import { validateClient  } from "../middlewares/authMiddleware.js";
import { registerClient,clientLogin } from "../controllers/client.controller.js";

const router = express.Router();

router.post(`/register`,registerClient);
router.post("/login", clientLogin);



export default router;