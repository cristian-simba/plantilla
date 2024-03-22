import { useState } from 'react';
import { Trash2, XIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

const DeleteModal = ({ text, deleteFunction }) => {
        
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                type="button"
                onClick={toggleModal}
            >
                Eliminar
            </button>


            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={toggleModal}
                            >
                                <XIcon size="sm" />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 flex flex-col justify-center items-center">
                                <Trash2 size={100} className='text-gray-900 mb-3' />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
                                    ¿Está seguro de eliminar el registro seleccionado?
                                </h3>
                                <div>
                                    <button
                                        type="button"
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                                        onClick={() => {
                                            deleteFunction();
                                            toggleModal();
                                        }}
                                    >
                                        Eliminar {text}
                                    </button>
                                    <button
                                        type="button"
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-800 hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        onClick={toggleModal}
                                    >
                                        No, cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
