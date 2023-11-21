import express from 'express';
// import { validateWorkerAndAdmin } from '../middlewares/authMiddleware.js';
import { addInvoice, getAllInvocies,saveServiceInvoices } from '../controllers/invoice.controller.js';
import { validateAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// add invoice to the database route
router.get('/',getAllInvocies);
router.post('/add',addInvoice);
router.post("/addinvoice",validateAdmin,saveServiceInvoices)


export default router;