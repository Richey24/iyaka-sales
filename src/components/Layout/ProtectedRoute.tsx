"use client"
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, isHydrated } = useUserStore();
    const router = useRouter();
    
    useEffect(() => {
        if (!isHydrated) return;
        if (!user) {
            router.push('/');
        }
    }, [user, isHydrated, router])

    if (!isHydrated) return (
        <div className="flex flex-col gap-2 justify-center items-center h-screen">
            <FaSpinner className="animate-spin" />
            <p>Loading...</p>
        </div>
    );

    return children;
}