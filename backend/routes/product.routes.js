import express from "express";

import {addProduct, getAllItems} from '../controllers/product.controller.js';

const router = express.Router();

router.post(`/addProduct`,addProduct);
router.get(`/`,getAllItems);


export default router;

