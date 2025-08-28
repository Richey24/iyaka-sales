import apiAxios from ".";
import { Company } from "@/utils/validation";
import { AxiosError } from "axios";

export const registerCompany = async (body: Company): Promise<{ data: { message: string, company: Company } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.post("/company", body);
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

export const getCompany = async (): Promise<{ data: { message: string, company: Company } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.get("/company");
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

export const updateCompany = async (body: Partial<Company>): Promise<{ data: { message: string, company: Company } | null, status: number, success: boolean }> => {
    try {
        const response = await apiAxios.put("/company", body);
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