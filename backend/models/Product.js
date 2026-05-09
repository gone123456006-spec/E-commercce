import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    mrp: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    group: {
        type: String,
        default: 'Other Categories'
    },
    image: {
        type: String,  // URL or base64 to image
        default: ''
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    unit: {
        type: String,
        default: 'pcs'  // kg, ml, l, g, pcs
    },
    unitValue: {
        type: Number,
        default: 1
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    quantitySold: {
        type: Number,
        default: 0
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }
}, {
    timestamps: true
});

// Index for fast search
productSchema.index({ name: 'text', category: 1, group: 1 });

const Product = mongoose.model('Product', productSchema);
export default Product;
