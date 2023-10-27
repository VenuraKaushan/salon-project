import express from "express";
import { addGuestAppointment,checkDate } from "../controllers/appointment.controller.js";

const router = express.Router();

router.post(`/add`,addGuestAppointment);
router.post(`/date`,checkDate)


export default router;