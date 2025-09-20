"use client";
import { ModalCard } from "@/components/modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketsProps } from "@/utils/tickets.type";
import { createContext, ReactNode, useState } from "react";


interface ModalContextProps {
    visible: boolean;
    handleModalVisible: () => void;
    ticket: CardInfo | undefined;
    setDetailTicket: (details: CardInfo) => void;
}

interface CardInfo{
    ticket: TicketsProps;
    customer: CustomerProps | null;
}


export const ModalContext = createContext({} as ModalContextProps);


export const ModalProvider = ({children}:{children: ReactNode}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [ticket, setTicket] = useState<CardInfo>();

    function handleModalVisible(){
        setVisible(!visible);
    }

    function setDetailTicket(details: CardInfo){
        setTicket(details);
    }
    
    
    return(
        <ModalContext.Provider value={{visible, handleModalVisible, ticket, setDetailTicket}}>
            {visible && <ModalCard/>}
            {children}
        </ModalContext.Provider>
    )
}