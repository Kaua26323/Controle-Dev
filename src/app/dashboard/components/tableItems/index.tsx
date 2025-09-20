"use client"

import { api } from "@/lib/api";
import { ModalContext } from "@/providers/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketsProps } from "@/utils/tickets.type";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { toast } from "react-toastify";


interface TicketsInfo {
    ticket: TicketsProps
    customer: CustomerProps | null;
}

export function TableTickets({ ticket, customer }:TicketsInfo){
    const {handleModalVisible, setDetailTicket} = useContext(ModalContext);
    const router = useRouter();

    async function changeStatus(){
        try{
            await api.patch("/api/ticket", {
            ticketId: ticket.id,
            status: "FECHADO",
            });

            router.refresh();

        }catch(err){
            toast.error("Algo deu errado...");
        }
         
    };

    function handleOpenModal(){
        handleModalVisible();
        
        setDetailTicket({
            customer: customer,
            ticket: ticket,
        });
    }

    return(
        <tr className="border-b-2 border-b-slate-400 h-16 last:border-b-2 bg-slate-200 hover:bg-slate-300">
            
            <td className="text-left pl-2">
                <p>
                    {ticket.name}
                </p>
            </td>

            <td className="text-left hidden sm:table-cell">
                {ticket?.created_at?.toLocaleDateString("pt-br")}
            </td>

            <td className="text-left">
                <span className="bg-green-500 px-2 py-1 rounded ">
                    {ticket.status}
                </span>
            </td> 

            <td className="text-left">
                <button onClick={changeStatus} className="mr-3 cursor-pointer hover:scale-105 duration-300">
                    <FiCheckSquare size={27} color="#05df72"/>
                </button>
                <button onClick={handleOpenModal}
                className="mr-3 cursor-pointer hover:scale-105 duration-300">
                    <FiFile size={26} color="#3b82f6"/>
                </button>
            </td> 
        </tr>
    )
}