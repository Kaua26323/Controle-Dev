import { Container } from "@/components/container";
import Link from "next/link";
import { TicketForm } from "./components/ticketForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewTicket(){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect("/");
    }

    return(
        <Container>
            <main>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard"
                        className="bg-slate-900 px-3 py-1 rounded text-white hover:scale-105 hover:bg-slate-800 duration-400">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo Chamado</h1>
                </div>
                <TicketForm/>
            </main>
        </Container>
    )
}