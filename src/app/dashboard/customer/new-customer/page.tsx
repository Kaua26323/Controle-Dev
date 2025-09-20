import { Container } from "@/components/container";
import Link from "next/link";
import { NewCustomerForm } from "../components/newCustomerForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewCustomer(){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect("/");
    };

    return(
        <Container>
            <main>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard/customer"
                        className="bg-slate-900 px-3 py-1 rounded text-white hover:scale-105 hover:bg-slate-800 duration-400">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo Cliente</h1>
                </div>
                <NewCustomerForm userId={session.user.id}/>
            </main>
        </Container>
    )
}