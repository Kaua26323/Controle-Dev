"use client"

import { ModalContext } from "@/providers/modal"
import { useContext, useRef } from "react"

export function ModalCard(){
    const {handleModalVisible, ticket} = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if(modalRef.current && !modalRef.current.contains(e.target as Node)){
            handleModalVisible();
        }
    }

    return(
        <section className="absolute w-full h-full bg-black/50 flex items-center justify-center" onClick={handleModalClick}>
            <div className="absolute inset-0 flex items-center justify-center">

                <div ref={modalRef} className="w-4/5 max-w-2xl bg-white shadow-lg p-3 rounded md:w-1/2">

                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold md:text-2xl">Detalhes do chamado</h1>

                        <button onClick={() => handleModalVisible()}
                            className="bg-red-500 text-white px-2.5 py-1 rounded cursor-pointer hover:scale-105 hover:bg-red-400 duration-500 md:text-lg">
                            Fechar
                        </button>
                    </div>

                    <article className="flex gap-1 items-center  flex-wrap mb-2">
                        <h2 className="font-bold md:text-lg">Nome:</h2>
                        <p className="md:text-lg">{ticket?.ticket.name}</p>
                    </article>

                    <article className="flex flex-col flex-wrap justify-center-center">
                        <h2 className="font-bold md:text-lg">Descrição:</h2>
                        <p className="md:text-lg">{ticket?.ticket.description}</p>
                    </article>

                    <div className="w-full border-b-[2px] border-gray-200 mt-4 mb-4"></div>
                    
                    <h2 className="font-bold text-xl mb-4">Detalhes do cliente</h2>

                    <article className="flex items-center flex-wrap gap-1 mb-2">
                        <h2 className="font-bold md:text-lg">Nome:</h2>
                        <p className="md:text-lg">{ticket?.customer?.name}</p>
                    </article>

                    <article className="flex items-center flex-wrap gap-1 mb-2">
                        <h2 className="font-bold md:text-lg">Email:</h2>
                        <p className="md:text-lg">{ticket?.customer?.email}</p>
                    </article>

                    <article className="flex items-center flex-wrap gap-1 mb-2">
                        <h2 className="font-bold md:text-lg">Telefone:</h2>
                        <p className="md:text-lg">{ticket?.customer?.phone}</p>
                    </article>

                    {ticket?.customer?.address && (
                        <article className="flex items-center flex-wrap gap-1">
                            <h2 className="font-bold md:text-lg">endereço:</h2>
                            <p className="md:text-lg">Rua peixe do mal</p>
                        </article>
                    )}
                </div>
            </div>
        </section>
    )
}