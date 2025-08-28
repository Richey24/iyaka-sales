import ForgotPassword from "@/components/ForgotPassword/ForgotPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Forgot Password',
    description: 'Iyaka Hub | Forgot Password',
}

export default function ForgotPasswordPage() {
    return (
        <ForgotPassword />
    );
}
