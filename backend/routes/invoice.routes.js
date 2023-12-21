import express from 'express';
import { 
    addInvoice, 
    getAllInvocies,
    saveServiceInvoices,
    getAllInvoiceBySecretAdmin,
    saveSecretServiceInvoice,
    getNonHideInvoice
 } from '../controllers/invoice.controller.js';
import { validateAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// add invoice to the database route
router.get('/',getAllInvocies);
router.post('/add',addInvoice);
router.post('/addInvoice',validateAdmin,saveServiceInvoices);
router.get("/allInvoices",getAllInvoiceBySecretAdmin);
router.post("/secret/addInvoice",saveSecretServiceInvoice)
router.get('/nonhideinvoice',getNonHideInvoice);


export default router;