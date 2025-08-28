import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { Sales } from "@/models/sales";
import mongoose from "mongoose";
import { Expenses } from "@/models/expenses";
import { Product } from "@/models/product";
import { Debtor } from "@/models/debtor";

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        const params = request.nextUrl.searchParams;
        const timeFrame = params.get("timeFrame") ?? "today";
        let startDate: Date | null = null;
        let endDate: Date | null = null;
        if (timeFrame === "today") {
            startDate = new Date(new Date().setHours(0, 0, 0, 0));
            endDate = new Date(new Date().setHours(23, 59, 59, 999));
        }
        if (timeFrame === "thisWeek") {
            const today = new Date();
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            startOfWeek.setHours(0, 0, 0, 0);
            const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
            endOfWeek.setHours(23, 59, 59, 999);
            startDate = startOfWeek;
            endDate = endOfWeek;
        }
        if (timeFrame === "thisMonth") {
            const today = new Date();
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            startOfMonth.setHours(0, 0, 0, 0);
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            endOfMonth.setHours(23, 59, 59, 999);
            startDate = startOfMonth;
            endDate = endOfMonth;
        }
        if (timeFrame === "thisYear") {
            const today = new Date();
            const startOfYear = new Date(today.getFullYear(), 0, 1);
            startOfYear.setHours(0, 0, 0, 0);
            const endOfYear = new Date(today.getFullYear(), 11, 31);
            endOfYear.setHours(23, 59, 59, 999);
            startDate = startOfYear;
            endDate = endOfYear;
        }
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET as string) as { companyId: string };
        await connectDB();
        const totalSalesResult = await Sales.aggregate([
            {
                $match: {
                    companyId: new mongoose.Types.ObjectId(decoded.companyId),
                    saleDate: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalAmount" }
                }
            }
        ]);
        const totalSales = totalSalesResult[0]?.totalSales || 0;
        const totalExpensesResult = await Expenses.aggregate([
            {
                $match: {
                    companyId: new mongoose.Types.ObjectId(decoded.companyId),
                    expenseDate: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalExpenses: { $sum: "$amount" }
                }
            }
        ]);

        const totalExpenses = totalExpensesResult[0]?.totalExpenses || 0;

        const productsInStockResult = await Product.aggregate([
            {
                $match: {
                    companyId: new mongoose.Types.ObjectId(decoded.companyId),
                }
            },
            {
                $addFields: {
                    totalStock: { $sum: "$variants.stock" }
                }
            },
            {
                $match: {
                    $expr: { $gt: ["$totalStock", "$lowStockLimit"] }
                }
            },
            {
                $count: "productsInStock"
            }
        ]);

        const productsInStockCount = productsInStockResult[0]?.productsInStock || 0;

        const totalOutstandingResult = await Debtor.aggregate([
            {
                $match: {
                    companyId: new mongoose.Types.ObjectId(decoded.companyId),
                    debtDate: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalOutstanding: {
                        $sum: { $subtract: ["$totalDebt", "$totalPaid"] }
                    }
                }
            }
        ]);

        const totalOutstanding = totalOutstandingResult[0]?.totalOutstanding || 0;

        const lowStockProducts = await Product.aggregate([
            {
                $match: {
                    companyId: new mongoose.Types.ObjectId(decoded.companyId),
                }
            },
            {
                $addFields: {
                    totalStock: { $sum: "$variants.stock" }
                }
            },
            {
                $match: {
                    $expr: { $lte: ["$totalStock", "$lowStockLimit"] }
                }
            }
        ]);

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const todaySales = await Sales.find({
            companyId: new mongoose.Types.ObjectId(decoded.companyId),
            saleDate: { $gte: startOfDay, $lte: endOfDay }
        });

        const salesLineData = await Sales.aggregate([
            {
                $match: {
                    companyId: new mongoose.Types.ObjectId(decoded.companyId),
                    saleDate: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
                    totalSales: { $sum: "$totalAmount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const lineChartData = salesLineData.map(item => ({
            date: item._id,
            sales: item.totalSales
        }));

        const expensePieData = await Expenses.aggregate([
            {
                $match: {
                    companyId: new mongoose.Types.ObjectId(decoded.companyId),
                    expenseDate: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const pieChartData = expensePieData.map(item => ({
            category: item._id,
            value: item.total
        }));

        return NextResponse.json({ totalSales, totalExpenses, productsInStockCount, totalOutstanding, lowStockProducts, todaySales, lineChartData, pieChartData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
}