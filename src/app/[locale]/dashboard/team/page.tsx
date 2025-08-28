import Team from "@/components/Team/Team";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Team',
    description: 'Iyaka Hub | Team',
}

export default function TeamPage() {
    return (
        <Wrapper>
            <Team />
        </Wrapper>
    );
}
