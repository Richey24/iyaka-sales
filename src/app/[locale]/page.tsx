import Login from "@/components/Login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Iyaka Hub | Login',
  description: 'Iyaka Hub | Login',
}

export default function Home() {
  return (
    <Login />
  );
}
