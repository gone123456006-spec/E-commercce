import Order from '../models/Order.js';

// ✅ CREATE a new order
export const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, deliveryAddress, paymentMethod, notes } = req.body;
        // User ID comes from auth middleware
        const userId = req.user._id;

        const order = new Order({
            userId,
            items,
            totalAmount,
            deliveryAddress,
            paymentMethod,
            notes
        });

        const savedOrder = await order.save();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: savedOrder
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ GET all orders (for Admin Dashboard)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'mobile').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ GET user's orders (for My Orders page)
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ UPDATE order status (Admin)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
