import React from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../Modals/DeleteModal";

const Tabla = ({ datos, columnas, eliminar, actualizarPath, textoEliminar, noEncontrado }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columnas.map((columna, index) => (
                            <th key={index} scope="col" className="px-6 py-3">{columna}</th>
                        ))}
                        <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos && datos.length > 0 ? (
                        datos.map((dato, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {columnas.map((columna, columnIndex) => (
                                    <td key={columnIndex} className="px-6 py-4">{dato[columna]}</td>
                                ))}
                                <td className="flex items-center px-6 py-4">
                                    <Link to={`${actualizarPath}/${dato.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Editar
                                    </Link>
                                    <DeleteModal
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                        text={textoEliminar}
                                        deleteFunction={() => eliminar(dato.id)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columnas.length + 1} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No existen registros de {noEncontrado}</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
}

export default Tabla;
