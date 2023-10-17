import express from "express";
import { validateClient  } from "../middlewares/authMiddleware.js";
import { registerClient } from "../controllers/client.controller.js";

const router = express.Router();

router.post(`/register`,registerClient);


export default router;