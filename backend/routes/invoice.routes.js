import express from 'express';
// import { validateWorkerAndAdmin } from '../middlewares/authMiddleware.js';
import { addInvoice, getAllInvocies } from '../controllers/invoice.controller.js';

const router = express.Router();

// add invoice to the database route
router.get('/',getAllInvocies);
router.post('/add',addInvoice);

export default router;