import { X } from "lucide-react";

const Mensaje = ({ children, tipo }) => {
    return (
        <div className={`p-3 border-l-4 ${tipo ? 'border-green-500' : 'border-red-600'} rounded-r-md 
                    ${tipo ? 'bg-green-50' : 'bg-red-50'} flex mt-2`}>
            <div>
                <X className={`w-5 h-5 ${tipo ? 'text-green-500' : 'text-red-500'}`}></X>
            </div>
            <div className="ml-2">
                <div className={`text-sm ${tipo ? 'text-green-500' : 'text-red-500'}`}>
                    <p>{children}</p>
                </div>
            </div>
        </div>
    )
}

export default Mensaje