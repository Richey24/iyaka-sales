import Team from "@/components/Team/Team";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";
import AdminWrapper from "@/components/Layout/AdminWrapper";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Team',
    description: 'Iyaka Hub | Team',
}

export default function TeamPage() {
    return (
        <Wrapper>
            <AdminWrapper>
            <Team />
            </AdminWrapper>
        </Wrapper>
    );
}
