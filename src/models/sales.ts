import mongoose from "mongoose";

const saleItemSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
})

const salesSchema = new mongoose.Schema({
    items: {
        type: [saleItemSchema],
        required: true,
    },
    paymentMethod: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    totalDiscount: {
        type: Number,
        default: 0,
    },
    saleDate: {
        type: Date,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
}, { timestamps: true });

export const Sales = mongoose.models.Sales || mongoose.model("Sales", salesSchema);

salesSchema.set("toJSON", { virtuals: true });
salesSchema.set("toObject", { virtuals: true });

salesSchema.virtual("company", {
    ref: "Company",
    localField: "companyId",
    foreignField: "_id",
    justOne: true,
})