import Dashboard from "@/components/Dashboard/Dashboard";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Dashboard',
    description: 'Iyaka Hub | Dashboard',
}

export default function DashboardPage() {
    return (
        <Wrapper>
            <Dashboard />
        </Wrapper>
    );
}
