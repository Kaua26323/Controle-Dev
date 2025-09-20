"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/input";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FormTicket } from "./components/formTicket";
import { api } from "@/lib/api";


const schema = z.object({
    email: z.string().email("Digite um email valido do cliente para localiza-lo").min(4, "Digite o email!"),
});

type FormData = z.infer<typeof schema>

export interface CustomerDataInfo{
    id: string;
    name: string;
}

export default function OpenNewTicket(){
    const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const {register, handleSubmit, setValue, setError, formState: { errors }} = useForm({
        resolver: zodResolver(schema),
    });

    function handleClearCustomer(){
        setCustomer(null);
        setValue("email", "");
    };

    async function handleSearchCustomer(data: FormData){
        setIsPending(true);

        const response = await api.get("api/openNewTicket", {
            params: {
                email: data.email,
            },
        });

        if(response.data === null){
            setError("email", {type: "custom", message: "Ops, cliente não encontrado!"});
            return;
        }
        
        setCustomer({
            id: response.data.id,
            name: response.data.name,
        });

        setIsPending(false);
    } 
    
    return(
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-3xl text-center mt-24">Abrir Chamado</h1>
            <main className="flex flex-col mt-4 mb-2">

                {customer ? (
                    <div className="bg-slate-200 flex items-center justify-between py-6 px-4 rounded border-2 border-gray-300 ">

                        <p className="text-lg"><strong>Cliente Selecionado:</strong> {customer.name}</p>

                        <button className="cursor-pointer"
                        onClick={handleClearCustomer}>
                            <FiX size={30} color="#fb2c36"/>
                        </button>
                    </div>
                ): (
                    <form className="bg-slate-200 py-6 px-4 rounded border-2 border-slate-300"
                    onSubmit={handleSubmit(handleSearchCustomer)}> 
                        <div className="flex flex-col gap-2">
                            <Input name="email"
                                placeholder="Digite o Email do cliente"
                                type="text"
                                error={errors.email?.message}
                                register={register}
                            />
                            <button type="submit"
                            className={`flex items-center justify-center gap-3 px-2 h-11 rounded text-white font-bold ${isPending ? "bg-gray-400" : "cursor-pointer bg-blue-500 hover:bg-blue-400  hover:scale-102 duration-300"}`}
                            disabled={isPending}>
                                
                                {isPending ? (
                                    <p>Procurando cliente...</p>

                                ) : (

                                   <p className="flex items-center gap-1">
                                        Procurar cliente
                                        <FiSearch size={24} color="fff"/>
                                   </p>
                                )}
                            </button>
                        </div>
                    </form>
                )}
                {customer !== null && <FormTicket customer={customer}/>}
            </main>
        </div>
    )
}