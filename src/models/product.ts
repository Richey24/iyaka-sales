import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    variantName: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    lowStockLimit: {
        type: Number,
        required: true,
    },
    variants: [variantSchema],
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);