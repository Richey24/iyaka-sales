import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
}, { timestamps: true });

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

categorySchema.set("toJSON", { virtuals: true });
categorySchema.set("toObject", { virtuals: true });

categorySchema.virtual("company", {
    ref: "Company",
    localField: "companyId",
    foreignField: "_id",
    justOne: true,
});