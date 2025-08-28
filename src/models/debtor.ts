import mongoose from "mongoose";

const paymentHistorySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
})

const debtorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    totalDebt: {
        type: Number,
        required: true,
    },
    totalPaid: {
        type: Number,
        required: false,
        default: 0,
    },
    debtDate: {
        type: Date,
        required: true,
    },
    paymentHistory: {
        type: [paymentHistorySchema],
        required: false,
        default: [],
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
}, { timestamps: true });

export const Debtor = mongoose.models.Debtor || mongoose.model("Debtor", debtorSchema);