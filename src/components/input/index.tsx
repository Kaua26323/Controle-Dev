import { register } from "module";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    error?: string;
}

export function Input({type, name, placeholder, register, rules, error}: InputProps){
    return(
        <>
           <input type={type}
              id={name}
              {...register(name, rules)}
              placeholder={placeholder}
              className="w-full bg-white px-1.5 py-2 border-2 border-slate-300 rounded-md mt-1.5"
              />
            {error && <p className="text-red-600 mb-2 px-1">{error}</p>}
        </>

    )
}