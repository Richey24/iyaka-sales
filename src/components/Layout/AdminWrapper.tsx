"use client"
import { useUserStore } from "@/store/userStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export default function AdminWrapper({ children }: { children: React.ReactNode }) {
    const { user } = useUserStore()
    const router = useRouter()

    useEffect(() => {
        if (user?.role !== 'admin') {
            router.push('/dashboard')
        }
    }, [user, router])

    return children
}