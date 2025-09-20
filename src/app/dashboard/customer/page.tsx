import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import  prismaClient  from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ClientCard } from "./components/clientCard";

export default async function Customer(){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect("/");
    };

    const customer = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id,
        }
    });

    return(
        <Container>
            <main>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Meus Clientes</h1>
                    <Link href="/dashboard/customer/new-customer"
                    className="bg-blue-500 px-4 py-1 rounded text-white text-lg hover:scale-105 hover:bg-blue-400 duration-500">
                        Novo Cliente
                    </Link>
                </div>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mt-5">
                    {customer.map( (clientInfo) => (
                        <ClientCard key={clientInfo.id} customer={clientInfo}/>
                    )
                    )}
                </section>
            </main>
        </Container>
    )
}