import Expenses from "@/components/Expenses/Expenses";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Expenses',
    description: 'Iyaka Hub | Expenses',
}

export default function ExpensesPage() {
    return (
        <Wrapper>
            <Expenses />
        </Wrapper>
    );
}
