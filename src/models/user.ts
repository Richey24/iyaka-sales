import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: "admin", enum: ["user", "admin"] },
        phoneNumber: { type: String },
        companyId: { type: Schema.Types.ObjectId, ref: "Company" },
    },
    { timestamps: true }
);

export const User = models.User || model("User", userSchema);

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

userSchema.virtual("company", {
    ref: "Company",
    localField: "companyId",
    foreignField: "_id",
    justOne: true,
});