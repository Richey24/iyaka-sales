import ProtectedRoute from "@/components/Layout/ProtectedRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    )
}