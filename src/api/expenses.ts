import { Expense } from "@/utils/validation"
import apiAxios from "."
import { AxiosError } from "axios"

export const addExpense = async (expense: Expense): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.post('/expenses', expense)
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

export const getExpenses = async (params?: { page?: number, limit?: number, search?: string }): Promise<{ data: { message: string, expenses: Expense[], total: number, totalPages: number } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.get('/expenses', { params })
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

export const updateExpense = async (id: string, expense: Expense): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.put(`/expenses?id=${id}`, expense)
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

export const deleteExpense = async (id: string): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.delete(`/expenses?id=${id}`)
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