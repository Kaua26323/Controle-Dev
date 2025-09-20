import { ReactNode } from "react";

export function Container({children}: {children: ReactNode }){
    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-3">
            {children}
        </div>
    )
}
