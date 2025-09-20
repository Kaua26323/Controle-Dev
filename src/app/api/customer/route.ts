import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";


export async function GET(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        return NextResponse.json({error: "Not autorized"}, {status: 401});
    }

    try{
        const clients = await prismaClient.customer.findMany({
            where: {
                userId: session.user.id
            }
        });

        return NextResponse.json(clients);

    }catch(err){
        return NextResponse.json({error: `Something went wrong...Error: ${err}`}, {status: 500});
    }
}



export async function POST(request: Request){
    const session = await getServerSession(authOptions);
    const {name, email, phone, address, userId} = await request.json();

    if(!session || !session.user){
        return NextResponse.json({error: "Not autorized"}, {status: 401});
    };

    try{
        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                userId: userId,
            }
        });

        return NextResponse.json({message: "Cliente cadastrado com sucesso!"}, {status: 201});
    
    }catch(err){
        
        return NextResponse.json({error:`Failed create new customer...Error:${err}`}, {status: 400});
    };
};

export async function DELETE(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        return NextResponse.json({error: "Not autorized"}, {status: 401});
    };

    const { searchParams } =  new URL(request.url); 
    const userId = searchParams.get("id");

    if(!userId){
        return NextResponse.json({error: "failed delete client"}, {status: 400});
    };

    // Verifica se o cliente tem algum chamado aberto.
    const hasTickets = await prismaClient.ticket.findFirst({
        where: {
            customerId: userId,
            status: "ABERTO"
        }
    });

    if(hasTickets){
        return NextResponse.json({error: "Failed delete client, client has a ticket"}, {status: 400});
    }

    try{

        await prismaClient.customer.delete({
            where:{
                id: userId,
            }
        });

        return NextResponse.json({message: "cliente deletado!"});

    }catch(err){    
        return NextResponse.json({error: `failed delete client, error: ${err}`});
    }   
}