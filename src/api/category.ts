import { Category } from "@/utils/validation";
import { AxiosError } from "axios";
import apiAxios from ".";

export const addCategory = async (category: Category): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.post("/categories", category);
        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                data: error.response?.data,
                status: error.response?.status || 500,
                success: false
            };
        }
        return {
            data: null,
            status: 500,
            success: false
        };
    }
}

export const getCategories = async (params?: { page?: number, limit?: number, search?: string }): Promise<{ data: { message: string, categories: Category[], total: number, totalPages: number } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.get(`/categories`, { params });
        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                data: error.response?.data,
                status: error.response?.status || 500,
                success: false
            };
        }
        return {
            data: null,
            status: 500,
            success: false
        };
    }
}

export const updateCategory = async (id: string, category: Partial<Category>): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.put(`/categories?id=${id}`, category);
        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                data: error.response?.data,
                status: error.response?.status || 500,
                success: false
            };
        }
        return {
            data: null,
            status: 500,
            success: false
        };
    }
}

export const deleteCategory = async (categoryId: string): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.delete(`/categories?id=${categoryId}`);
        return {
            data: response.data,
            status: response.status,
            success: true
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            return {
                data: error.response?.data,
                status: error.response?.status || 500,
                success: false
            };
        }
        return {
            data: null,
            status: 500,
            success: false
        };
    }
}