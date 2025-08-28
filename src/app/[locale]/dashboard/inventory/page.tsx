import Inventory from "@/components/Inventory/Inventory";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Inventory',
    description: 'Iyaka Hub | Inventory',
}

export default function InventoryPage() {
    return (
        <Wrapper>
            <Inventory />
        </Wrapper>
    );
}
