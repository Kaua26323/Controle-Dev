
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "../../page";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";


const schema = z.object({
    name: z.string().min(1, "Digite o nome do problema"),
    description: z.string().min(1, "Fale um pouco sobre o problema que está ocorrendo")
});

type FormData = z.infer<typeof schema>;   


interface FormTicketProps {
    customer: CustomerDataInfo;
}


export function FormTicket({customer}: FormTicketProps){
    const {register, handleSubmit, setValue, formState: {errors} } = useForm<FormData>({resolver: zodResolver(schema)})
    const [isPending, setIsPending] = useState<boolean>(false);

    async function handleRegisterTicket(data: FormData){
        setIsPending(true);

        try{
            const response = await api.post("/api/openNewTicket", {
            name: data.name,
            description: data.description,
            customerId: customer.id,
            });

            if (response.status !== 200) {
                toast.error("Erro ao criar o ticket. Verifique os dados.");
            }else {
                toast.success("Ticket criado com sucesso!");
            }

        } catch (err) {
            toast.error("Erro de conexão. Tente novamente mais tarde.");
        }

        setValue("name", "");
        setValue("description", "");
        setIsPending(false);
    }


    return(
        <form className="bg-slate-200 mt-6 px-4 py-6 rounded border-2 border-slate-300"
        onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="font-medium text-lg">Nome do chamado</label>
            <Input
                register={register}
                type="text"
                placeholder="Digite o nome do chamado"
                name="name"
                error={errors.name?.message}
            />
            <div className="flex flex-col mt-5 mb-3 gap-1">
                <label className="font-medium text-lg">Descreva o problema</label>
                <textarea
                    className="w-full bg-white  border-2 border-slate-300 rounded-md h-24 resize-none px-1.5"
                    placeholder="Descreva o seu problema"
                    id="description"
                    {...register("description")}
                >
                </textarea>
                {errors.description?.message && <p className="text-red-500 my-1">{errors.description?.message}</p>}            
            </div>

            <button type="submit"
            disabled={isPending}
            className={`rounded-md w-full flex items-center justify-center h-11 px-2 text-white font-bold  ${isPending ? "bg-gray-400" : "bg-blue-500 cursor-pointer hover:bg-blue-400 hover:scale-102 duration-300"}`}>
                {isPending ? (
                    <FaSpinner size={27} color="FFF"  className="animate-spin"/>
                ) : (
                    <p className="text-lg"> Cadastrar </p>
                )}
            </button>
        </form>
    )
}