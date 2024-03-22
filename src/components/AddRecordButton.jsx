import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const AddRecordButton = ({ text, to }) => {
    return (
        <div className="max-w-md mb-8">
            <div className="flex flex-row items-center flex-grow border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <Link to={to} className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <Plus size={18} className="text-white mr-2" />
                    Agregar {text}
                </Link>
            </div>
        </div>
    );
}

export default AddRecordButton;
