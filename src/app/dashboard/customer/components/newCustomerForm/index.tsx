"use client"

import { Input } from "@/components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useRouter } from "next/navigation";

const schema = z.object({
    name: z.string().min(1, "Digite o nome do cliente..."),
    email: z.string().email("Digite um email válido").min(1, "Digite seu email..."),
    address: z.string(),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "Número de telefone deve estar em Ex: (DD) 000000000"
    }), 
});

type FormData = z.infer<typeof schema>

export function NewCustomerForm({userId}: {userId: string}){
    const router = useRouter();
    const [isPending, setIsPending] = useState<boolean>(false);

    const {register, handleSubmit, formState: {errors}  } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    async function handleRegisterClient(data: FormData){
        setIsPending(true); 

        const res = await api.post("/api/customer", {
            name: data.name,
            phone: data.phone,  
            email: data.email,
            address: data.address,
            userId: userId,
        });

        console.log(res.data);

        setIsPending(false); 
        toast.success("Cliente cadastrado com sucesso!");
        router.replace("/dashboard/customer");
    };

    return(
        <form className="w-full mt-9" onSubmit={handleSubmit(handleRegisterClient)}>
            <label className="font-medium text-xl">Nome completo:</label>
            <Input type="text"
              name="name"
              register={register}
              error={errors.name?.message}
              placeholder="Digite o nome do cliente"
              />

            <div className="flex flex-col items-center gap-2 sm:flex-row mt-3 mb-3">
                <div className="w-full sm:flex-1">
                    <label className="font-medium text-xl"> Telefone:</label>
                    
                    <Input type="text"
                       name="phone"
                       register={register}
                       error={errors.phone?.message}
                       placeholder="Digite o número de telefone"
                     />  

                </div>

                <div className="w-full sm:flex-1">
                    <label className="font-medium text-xl">Email:</label>

                    <Input type="text"
                      name="email"
                      register={register}
                      error={errors.email?.message}
                      placeholder="Digite o email do cliente"/>  
                </div>
            </div>

            <label className="font-medium text-xl">Endereço:</label>
            <Input type="text"
               name="address"
               register={register}
               error={errors.address?.message}
               placeholder="Digite o endereço do cliente"/>  

            <button type="submit" className={`w-full flex items-center justify-center h-11 rounded-md mt-3.5 text-white text-lg font-bold ${isPending ? "bg-gray-400" : "bg-blue-500 hover:scale-102 hover:bg-blue-400 duration-400 cursor-pointer"}`}
            disabled={isPending}>

                {isPending ? (

                    <ImSpinner size={24} color="fff" className="animate-spin"/>

                ) : ( <p>Cadastar</p> )}

            </button>
        </form>
    )
}