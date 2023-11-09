import express from "express";
import { addGuestAppointment,checkDate,getAllAppointmentsByAdmin,getAllAssignedAppointmentsByAdmin } from "../controllers/appointment.controller.js";
import { validateClient,validateAdmin  } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(`/add`,addGuestAppointment);
router.post(`/date`,checkDate)
router.get('/',validateAdmin,getAllAppointmentsByAdmin)
router.get("/assigned",validateAdmin,getAllAssignedAppointmentsByAdmin)


export default router;