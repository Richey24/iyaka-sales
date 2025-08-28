import { Product } from "@/utils/validation";
import { AxiosError } from "axios";
import apiAxios from ".";

export const addProduct = async (product: Product): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.post('/products', product)
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

export const getProducts = async (params?: { page?: number, limit?: number, search?: string }): Promise<{ data: { message: string, products: Product[], total: number, totalPages: number } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.get('/products', { params })
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

export const updateProduct = async (id: string, product: Product): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.put(`/products?id=${id}`, product)
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

export const deleteProduct = async (id: string): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.delete(`/products?id=${id}`)
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