import Debtors from "@/components/Debtors/Debtors";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Debtors',
    description: 'Iyaka Hub | Debtors',
}

export default function DebtorsPage() {
    return (
        <Wrapper>
            <Debtors />
        </Wrapper>
    );
}
