"use client";

 import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaLock, FaRegUser, FaSpinner } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";

export function Header(){
    const { status }= useSession();

    return(
        <header className="w-full bg-white shadow-md">
            <main className="max-w-7xl flex items-center mx-auto px-4 h-20 sm:px-3">
                <div className="w-full flex items-center justify-between">
                    <Link href="/">
                        <h1 className="text-2xl text-black font-bold hover:tracking-widest duration-400">
                            <span className="bg-gradient-to-r from-blue-400 to-blue-900 bg-clip-text text-transparent text-">
                                DEV
                            </span> CONTROLE
                        </h1>
                    </Link>

                    

                    {status === "loading" && (
                        <FaSpinner size={24} color="000" className="animate-spin"/>
                    )}

                    {status === "unauthenticated" && (
                        <div className="flex items-center gap-4">
                            <Link href="/open">
                                <IoIosSend  size={27}/>
                            </Link>

                            <button className="cursor-pointer"
                            onClick={() => signIn("google")}>
                                <FaLock size={24} color="000"/>
                            </button>
                        </div>
                    )}

                    {status === "authenticated" && (
                        <div className="flex items-center gap-3">
                            <Link href="/open">
                                <IoIosSend  size={27}/>
                            </Link>

                            <Link href="/dashboard">
                                <FaRegUser size={24} color="000"/> 
                            </Link>

                            <button className="cursor-pointer"
                            onClick={() => signOut()}>
                                <FiLogOut size={24} color="red"/>
                            </button>     
                        </div> 
                    )}     

                </div>
            </main>
        </header>
    )
}