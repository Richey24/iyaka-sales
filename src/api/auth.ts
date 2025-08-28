import { AxiosError } from "axios";
import apiAxios from ".";
import { User } from "@/utils/validation";


export const login = async (body: { email: string, password: string }): Promise<{ data: { message: string, user: User } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.post("/auth/login", body);
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
};

export const register = async (body: User): Promise<{ data: { message: string, user: User } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.post("/auth/register", body);
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
};  

export const logout = async (): Promise<{ data: { message: string } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.get("/auth/logout");
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
    }
    return {
        data: null,
        status: 500,
        success: false
    };
}