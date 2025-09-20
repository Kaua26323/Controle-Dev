import Image from "next/image";
import heroImage from "@/assets/hero.svg";

export default function Home(){
    return(
        <main className="w-full min-h-[calc(100dvh-80px)] flex items-center justify-center px-3">
            <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="text-2xl font-bold sm:text-3xl">Gerencie sua empresa</h2>

                <h1 className="text-3xl font-bold text-blue-500 mb-5 sm:text-4xl">Atendimentos e Clientes</h1>
                
                <Image
                src={heroImage}
                alt="imagem for homePage"
                className="w-96 sm:w-lg md:w-2xl"/>
            </div>
        </main>
    )
}