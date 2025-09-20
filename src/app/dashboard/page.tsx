import { Container } from "@/components/container";
import Link from "next/link";
import { TableTickets } from "./components/tableItems";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function Dashboard(){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect("/");
    };

    const tickets = await prismaClient.ticket.findMany({
        where: {
            status: "ABERTO",
            customer: {
                userId: session.user.id,
            },
        }, 
        
        orderBy: {
            created_at: "desc"
        },

        include: {
            customer: true,
        }
    });

    return(
        <Container>
            <main>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <Link href="/dashboard/newticket"
                        className="bg-blue-500 text-xl text-white px-3 py-1 rounded hover:scale-105 hover:bg-blue-400 duration-400">
                        Abrir chamado
                    </Link>
                </div>
            </main>

            <table className="min-w-full my-2 px-1 mt-7">
                <thead className="bg-slate-400 rounded-t-md px-4 py-5">
                    <tr>
                        <th className="font-medium text-left pl-1">CLIENTE</th>
                        <th className="font-medium text-left hidden sm:table-cell">DATA CADASTRO</th>
                        <th className="font-medium text-left">STATUS</th>
                        <th className="font-medium text-left">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets && tickets.map((ticketsInfo) =>  (
                        <TableTickets key={ticketsInfo.id}
                        ticket={ticketsInfo} customer={ticketsInfo.customer}/>
                    ))}
                </tbody>
            </table>

            {tickets.length === 0 && (
                <h2 className="text-xl text-center">Você não tem nenhum chamado :(</h2>
            )}
        </Container>
    )
}