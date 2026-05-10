import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Public routes (website can access)
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin routes (dashboard access) - we can protect these later
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
