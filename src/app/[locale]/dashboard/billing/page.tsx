import Billing from "@/components/Billing/Billing";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Billing',
    description: 'Iyaka Hub | Billing',
}

export default function BillingPage() {
    return (
        <Wrapper>
            <Billing />
        </Wrapper>
    );
}
