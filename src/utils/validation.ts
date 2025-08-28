import { z } from "zod";

export const userSchema = z.object({
    _id: z.string().optional(),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    phoneNumber: z.string().optional(),
    role: z.enum(["user", "admin"]).optional(),
    companyId: z.string().optional(),
});

export const companySchema = z.object({
    name: z.string().min(1, { message: "Business name is required" }),
    businessType: z.string().min(1, { message: "Business type is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    businessArea: z.string().min(1, { message: "Business area is required" }),
    businessPhone: z.string().optional(),
    businessEmail: z.email().optional(),
    taxId: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const categorySchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, { message: "Category name is required" }),
});

export const productSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, { message: "Product name is required" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    lowStockLimit: z.number().min(0, { message: "Low stock limit must be greater than 0" }),
    variants: z.array(z.object({
        _id: z.string().optional(),
        variantName: z.string().min(1, { message: "Variant name is required" }),
        stock: z.number().min(0, { message: "Stock must be greater than 0" }),
        price: z.number().min(0, { message: "Price must be greater than 0" }),
    })),
});

export const salesSchema = z.object({
    _id: z.string().optional(),
    items: z.array(z.object({
        _id: z.string().optional(),
        productName: z.string().min(1, { message: "Product name is required" }),
        quantity: z.number().min(0, { message: "Quantity must be greater than 0" }),
        price: z.number().min(0, { message: "Price must be greater than 0" }),
        discount: z.number().optional(),
    })),
    paymentMethod: z.enum(["cash", "bank", "pos", "credit"]),
    totalAmount: z.number().min(0, { message: "Total amount must be greater than 0" }),
    totalDiscount: z.number().optional(),
    saleDate: z.coerce.date(),
    customer: z.string().min(1, { message: "Customer is required" }),
});

export const debtorSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    totalDebt: z.number().min(0, { message: "Total debt must be greater than 0" }),
    totalPaid: z.number().optional(),
    debtDate: z.coerce.date(),
    paymentHistory: z.array(z.object({
        amount: z.number().min(0, { message: "Amount must be greater than 0" }),
        date: z.coerce.date(),
    })).optional(),
});

export const expensesSchema = z.object({
    _id: z.string().optional(),
    description: z.string().min(1, { message: "Description is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    amount: z.number().min(0, { message: "Amount must be greater than 0" }),
    expenseDate: z.coerce.date(),
});

export type User = z.infer<typeof userSchema>;
export type UserLogin = z.infer<typeof loginSchema>;
export type Company = z.infer<typeof companySchema>;
export type Login = z.infer<typeof loginSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type Sales = z.infer<typeof salesSchema>;
export type Debtor = z.infer<typeof debtorSchema>;
export type Expense = z.infer<typeof expensesSchema>;