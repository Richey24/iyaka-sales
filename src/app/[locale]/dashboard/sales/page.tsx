import Sales from "@/components/Sales/Sales";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Sales',
    description: 'Iyaka Hub | Sales',
}

export default function SalesPage() {
    return (
        <Wrapper>
            <Sales />
        </Wrapper>
    );
}
