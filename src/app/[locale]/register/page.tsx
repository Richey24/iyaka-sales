import Register from "@/components/Register/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Register',
    description: 'Iyaka Hub | Register',
}

export default function RegisterPage() {
    return (
        <Register />
    );
}
