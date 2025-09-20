import Link from "next/link";

export function DashboardHeader(){
    return(
        <header className="max-w-7xl mx-auto px-2 mt-4 mb-9">
            <main className="bg-slate-900 flex items-center gap-3 py-2.5 px-2.5 rounded-md text-white">
                <Link href="/dashboard" className="text-lg hover:font-bold duration-400 hover:tracking-wide">
                    Chamadas
                </Link>

                <Link href="/dashboard/customer" className="text-lg hover:font-bold hover:tracking-wide duration-400">
                    Clientes
                </Link>
            </main>
        </header>
    )
}