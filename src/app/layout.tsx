import { ReactNode } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "@/providers/modal";

export const metadata: Metadata = {
    title: "DevControle - Gerencie seus clientes",
    description: "Gerencie seus serviços e clientes com o Dev-Controle",
    keywords: ["Dev-Controle", "DevControle", "Dev-Chamados"],
};

export default function RootLayout({children}: {children: ReactNode }){
    return(
        <html lang="pt-br">
            <body>
    
                <AuthProvider>
                    <ModalProvider>
                        <ToastContainer/>
                        <Header/>
                        {children}
                    </ModalProvider>
                </AuthProvider>
            </body>
        </html>
    )
}