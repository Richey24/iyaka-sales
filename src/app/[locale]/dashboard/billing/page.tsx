import Billing from "@/components/Billing/Billing";
import AdminWrapper from "@/components/Layout/AdminWrapper";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Billing',
    description: 'Iyaka Hub | Billing',
}

export default function BillingPage() {
    return (
        <Wrapper>
            <AdminWrapper>
                <Billing />
            </AdminWrapper>
        </Wrapper>
    );
}
