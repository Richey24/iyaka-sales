"use client"
import { SnackbarProvider } from "notistack";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SnackbarProvider>
            {children}
        </SnackbarProvider>
    )
}