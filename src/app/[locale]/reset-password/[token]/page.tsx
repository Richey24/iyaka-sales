import ResetPassword from "@/components/ResetPassword/ResetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Reset Password',
    description: 'Iyaka Hub | Reset Password',
}

export default function ResetPasswordPage() {
    return (
        <ResetPassword />
    );
}
