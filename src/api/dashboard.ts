import { Product, Sales } from "@/utils/validation";
import apiAxios from ".";
import { AxiosError } from "axios";

export const getDashboardData = async (timeFrame: string): Promise<{ data: { totalSales: number, totalExpenses: number, productsInStockCount: number, totalOutstanding: number, lowStockProducts: Product[], todaySales: Sales[], lineChartData: any[], pieChartData: any[] } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.get(`/dashboard?timeFrame=${timeFrame}`);
        return {
            data: response.data,
            status: response.status,
            success: true
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                data: error.response?.data,
                status: error.response?.status || 500,
                success: false
            }
        }
        return {
            data: null,
            status: 500,
            success: false
        }
    }
}