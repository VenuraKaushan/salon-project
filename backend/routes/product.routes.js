import express from "express";

import {addProduct, 
        getAllItems,
        updateProduct,
        deleteProduct,
} from '../controllers/product.controller.js';

const router = express.Router();

router.post(`/addProduct`,addProduct);
router.get(`/`,getAllItems);
router.put(`/update/:id`,updateProduct);
router.delete(`/delete/:id`,deleteProduct);

export default router;

