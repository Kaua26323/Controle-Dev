import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const clientEmail = searchParams.get("email");

    if(!clientEmail || clientEmail === ""){
        return NextResponse.json({message: "Customer not found"}, {status: 400});
    };

    try{
        const customer = await prismaClient.customer.findFirst({
            where: {
                email: clientEmail,
            }
        });

        return Response.json(customer);

    }catch(err){
        return NextResponse.json({message: "Customer not found"}, {status: 400});
    };
}


export async function POST(request: Request){
    const {customerId, name, description} = await request.json();

    if(!customerId ||  !name || !description){
        return NextResponse.json({error: "Failed create new ticket"}, {status: 400});
    };

    try{
        await prismaClient.ticket.create({
            data: {
                name: name,
                description: description,
                status: "ABERTO",
                customerId: customerId,
            }
        });
        
        return NextResponse.json({message: "Cadastrado com sucesso!"});

    }catch(err){
        return NextResponse.json({error: "Failed create new ticket"}, {status: 500});
    };
}