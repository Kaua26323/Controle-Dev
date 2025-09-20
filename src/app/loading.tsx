import { FaSpinner } from "react-icons/fa";

export default function Loading(){
    return(
        <div className="w-full min-h-[calc(100dvh-80px)] flex items-center justify-center">
            <FaSpinner size={50} color="gray" className="animate-spin"/>            
        </div>
    )
}