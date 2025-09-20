"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";
import { ImSpinner } from "react-icons/im";

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatorio!"),
    description: z.string().min(1, "Descreva o problema."),
    options: z.string().min(1, "Escolha o cliente..."),
});

type FormData = z.infer<typeof schema>;

export function TicketForm(){
    const router = useRouter();
    const [clients, setClients] = useState<CustomerProps[] | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        async function getCustomerData(){
            const dataClients = await api.get("/api/customer");
            setClients(dataClients.data);
        }
        getCustomerData();
        
    }, []);

    async function HandleRegisterTicket(data: FormData){
        setIsPending(true);

        await api.post("/api/ticket", {
            clientId: data.options,
            name: data.name,
            description: data.description,
            status: "ABERTO",
        });

        setIsPending(false);
        router.replace("/dashboard");
    }
    
    return(
        <form className="mt-6" onSubmit={handleSubmit(HandleRegisterTicket)}>
            <label className="font-medium text-xl">Nome do chamado</label>
            <Input name="name"
               type="text"
               placeholder="Digite o nome do chamado"
               register={register}
               error={errors.name?.message}/>
            
            <div className="w-full flex flex-col gap-1 mt-5 mb-5">
                <label className="font-medium text-xl">Descreva o problema</label>
                <textarea 
                    id="description"
                    {...register("description")}
                    className="w-full h-22 px-1 pt-1 border-2 border-slate-300 rounded-md resize-none"
                    placeholder="Descreva o problema que está ocorrendo..."
                    >
                </textarea>
                {errors.description?.message && <p className="text-red-500 px-1">{errors.description.message}</p>}
            </div>

            
            <label className="font-medium text-xl">Selecione o Cliente</label>
            {clients && (
                <select id="options"
                {...register("options")}
                className="w-full px-2 py-2 border-2 border-slate-400 rounded-md mt-1">
                    {clients.map((client) => (
                        <option key={client.id} value={client.id} >{client.name}</option>
                    ))}
                </select>
            )}

            <button type="submit" disabled={isPending}
            className={`w-full h-11 flex items-center justify-center rounded-md mt-4 text-white text-lg font-bold ${isPending ? "bg-gray-400" : "bg-blue-500 cursor-pointer hover:scale-102 hover:bg-blue-400 duration-400"}`}>
                
                {isPending ? (
                    <ImSpinner size={30} color="fff" className="animate-spin"/>

                ) : ( <p>Cadastar</p> )}
            </button>
        </form>
    )
}