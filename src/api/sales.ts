import { Sales } from "@/utils/validation"
import apiAxios from "."
import { AxiosError } from "axios"


export const addSales = async (sales: Sales): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.post('/sales', sales)
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

export const getSales = async (params?: { page?: number, limit?: number, search?: string, paymentMethod?: string | null, startDate?: string | null, endDate?: string | null }): Promise<{ data: { message: string, sales: Sales[], total: number, totalPages: number } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.get('/sales', { params })
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

export const updateSales = async (id: string, sales: Sales): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.put(`/sales?id=${id}`, sales)
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

export const deleteSales = async (id: string): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.delete(`/sales?id=${id}`)
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