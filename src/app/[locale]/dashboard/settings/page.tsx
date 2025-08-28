import Settings from "@/components/Settings/Settings";
import Wrapper from "@/components/Layout/Wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Iyaka Hub | Settings',
    description: 'Iyaka Hub | Settings',
}

export default function SettingsPage() {
    return (
        <Wrapper>
            <Settings />
        </Wrapper>
    );
}
