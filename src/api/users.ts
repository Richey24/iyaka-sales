import { User } from "@/utils/validation";
import apiAxios from ".";
import { AxiosError } from "axios";

export const addUser = async (user: User): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.post('/users', user)
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

export const getUsers = async (): Promise<{ data: { message: string, users: User[] } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.get('/users')
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

export const deleteUser = async (id: string): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.delete(`/users?id=${id}`)
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