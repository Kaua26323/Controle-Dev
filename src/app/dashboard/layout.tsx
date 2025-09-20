import { Metadata } from "next";
import { ReactNode } from "react";
import { DashboardHeader } from "./components/header/dashboardHeader";


export const metadata: Metadata = {
    title: "Dev Controle - Dashboard",
    description: "Gerencie seu cliente e chamados aqui!"
}

export default function RootLayout({children}: {children: ReactNode}){
    return(
        <>
            <DashboardHeader/>
            {children}
        </>
    )
}