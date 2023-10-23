import express from "express";
import { addGuestAppointment } from "../controllers/appointment.controller.js";

const router = express.Router();

router.post(`/add`,addGuestAppointment);


export default router;