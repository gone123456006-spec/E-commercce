import Product from '../models/Product.js';
import { PRODUCT_VISIBILITY_DELAY_MS } from '../config/constants.js';

const publicVisibilityFilter = () => ({
    isAvailable: true,
    $or: [
        { visibleAt: { $exists: false } },
        { visibleAt: null },
        { visibleAt: { $lte: new Date() } }
    ]
});

// ✅ SAVE a new product to MongoDB
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, mrp, category, group, image, stock, unit, unitValue } = req.body;

        const visibleAt = new Date(Date.now() + PRODUCT_VISIBILITY_DELAY_MS);

        const product = new Product({
            name,
            description,
            price,
            mrp,
            category,
            group,
            image,
            stock,
            unit,
            unitValue,
            visibleAt
        });

        const savedProduct = await product.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ FETCH all products from MongoDB
export const getAllProducts = async (req, res) => {
    try {
        const { category, group, search } = req.query;

        let filter = { ...publicVisibilityFilter() };

        if (category) filter.category = category;
        if (group) filter.group = group;
        if (search) filter.$text = { $search: search };

        const products = await Product.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ FETCH single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            ...publicVisibilityFilter()
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ UPDATE a product in MongoDB
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ DELETE a product from MongoDB
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
