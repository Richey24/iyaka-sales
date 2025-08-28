import Category from "@/components/Category/Category";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Categories',
    description: 'Iyaka Hub | Categories',
}

export default function CategoriesPage() {
    return (
        <Wrapper>
            <Category />
        </Wrapper>
    );
}
