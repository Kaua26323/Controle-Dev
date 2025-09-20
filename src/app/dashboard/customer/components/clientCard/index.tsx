"use client";

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface ClientInfo {
    customer: CustomerProps;
}

export function ClientCard({customer}:ClientInfo){
    const [isPending, setIsPending] = useState<boolean>(false);
    const router = useRouter();

    async function handleDeleteClient(){
        setIsPending(true);

        try{
            const response =  await api.delete("/api/customer", {
                params: {
                    id: customer.id
                }
            });
            toast.success("Cliente deletado");

        }catch(err){
            toast.error(`Esse cliente tem um ticket em aberto...`);

        }finally{
            setIsPending(false);
            router.refresh();
        };
    }

    return(
        <article className="bg-slate-100 w-full flex-col gap-2.5 border-2 border-slate-300 px-3 py-3 rounded">
            <div className="flex items-center gap-1 mb-2">
                <h2 className="text-lg font-bold">Nome:</h2>
                <p className="text-lg">{customer.name}</p>
            </div>

            <div className="flex items-center gap-1 mb-2">
                <h2 className="text-lg font-bold">Email:</h2>
                <p className="text-lg">{customer.email}</p>
            </div>

            <div className="flex items-center gap-1 mb-3">
                <h2 className="text-lg font-bold">Telefone</h2>
                <p className="text-lg">{customer.phone}</p>
            </div>

            <button onClick={handleDeleteClient}
            disabled={isPending}
            className={`self-start text-white px-4 py-1  rounded ${isPending ? "bg-gray-400" : "bg-red-600 cursor-pointer hover:scale-105 hover:bg-red-400 duration-400"}`}>
                {isPending ? (<p>Deletando...</p>) : (<p>Deletar</p>)}
            </button>
        </article>
    )
}