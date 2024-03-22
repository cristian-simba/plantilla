import TablaEjemplo from "../../components/Tablas/TablaEjemplo"

const Listar = () => {
    return(
        <>
            <div className="p-5 flex flex-col">
                <h1 className=" text-2xl font-bold mb-4">Módulo de Ejemplo</h1>
                <span className="font-medium text-gray-500 mb-8">Revisa los estudiantes .. no tengo ideas xD</span>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="lg:w-full sm:w-1/2">
                        <TablaEjemplo/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Listar