import { Schema, model, models } from "mongoose";

const companySchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        businessType: { type: String, required: true },
        address: { type: String, required: true },
        businessArea: { type: String, required: true },
        businessPhone: { type: String },
        businessEmail: { type: String, unique: true },
        taxId: { type: String },
    },
    { timestamps: true }
);

export const Company = models.Company || model("Company", companySchema);

companySchema.set("toJSON", { virtuals: true });
companySchema.set("toObject", { virtuals: true });

companySchema.virtual("user", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true,
});