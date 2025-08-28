import ProtectedRoute from "@/components/Layout/ProtectedRoute";
import Onboarding from "@/components/Onboarding/Onboarding";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Onboarding',
    description: 'Iyaka Hub | Onboarding',
}

export default function OnboardingPage() {
    return (
        <ProtectedRoute>
            <Onboarding />
        </ProtectedRoute>
    );
}
