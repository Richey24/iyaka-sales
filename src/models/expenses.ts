import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    expenseDate: {
        type: Date,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
}, { timestamps: true });

export const Expenses = mongoose.models.Expenses || mongoose.model("Expenses", expensesSchema);