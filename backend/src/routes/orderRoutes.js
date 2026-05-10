import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus
} from '../controllers/orderController.js';

const router = express.Router();

// User routes (requires login)
router.post('/', protect, createOrder);
router.get('/myorders', protect, getUserOrders);

// Admin routes (we should ideally add an admin middleware later)
router.get('/', getAllOrders); // For Admin Dashboard
router.put('/:id/status', updateOrderStatus);

export default router;
