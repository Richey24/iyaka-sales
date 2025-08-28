import mongoose from "mongoose";

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
        required: true,
    },
    debtDate: {
        type: Date,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
}, { timestamps: true });

export const Debtor = mongoose.models.Debtor || mongoose.model("Debtor", debtorSchema);

debtorSchema.set("toJSON", { virtuals: true });
debtorSchema.set("toObject", { virtuals: true });

debtorSchema.virtual("company", {
    ref: "Company",
    localField: "companyId",
    foreignField: "_id",
    justOne: true,
})