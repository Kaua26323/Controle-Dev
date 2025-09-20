import { authOptions } from "@/lib/auth";
import  PrismaClient  from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//"/api/ticket"

export async function POST(request: Request){
    const session = await getServerSession(authOptions);
    const {clientId, name, description, status } = await request.json();

    if(!session || !session.user){
        return NextResponse.json({error: "Not autorized"}, {status: 401});
    };

    if(!name || !description || !clientId || !status){
        return NextResponse.json({error: "Invalid values here..."}, {status: 400});
    }

    try{
        await PrismaClient.ticket.create({
            data:{
                userId: session.user.id,
                customerId: clientId,
                name: name,
                description: description,
                status: status,
            }
        });

        return NextResponse.json({message: "Ticket criado com sucesso!"});

    }catch(err){
        return NextResponse.json({error: "Something went wrong...Error:"+err}, {status: 500})
    } 
}

export async function PATCH(request: Request){
    const {ticketId, status} = await request.json();

     if(!ticketId ||  !status){
        return NextResponse.json({error: "Invalid values..."}, {status: 400});
    };

    try{
        await PrismaClient.ticket.update({
            where: {
                id: ticketId,
            },

            data: {
                status: status,
            },
        });
        return NextResponse.json({message: "Status alterado!"});
    
    }catch(err){
        return NextResponse.json({error: "Something went wrong, Error:" + err});
    }
}