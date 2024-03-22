import React from "react";

const Paginacion = ({ paginaActual, paginasTotales, cambiarPagina }) => {
    return (
        <div className="mt-3 flex justify-center">
            {paginasTotales > 1 && (
                <ul className="flex list-none">
                    {Array.from({ length: paginasTotales }).map((_, index) => (
                        <li key={index} className="px-2 ">
                            <button
                                className={`bg-gray-200 rounded-md w-6 text-gray-500 hover:underline focus:outline-none ${paginaActual === index + 1 ? 'font-bold text-blue-700' : ''}`}
                                onClick={() => cambiarPagina(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Paginacion;
