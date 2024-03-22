import React from 'react'
import FormEjemplo from '../../components/Forms/FormEjemplo'

const Registrar = () => {
    return(
        <>
            <div className="p-5 flex flex-col h-screnn">
                <h1 className=" text-2xl font-bold mb-4">Agregar Estudiantes</h1>
                <span className="font-medium text-gray-500 mb-8">Agrega un estudiante más a la lista</span>
                <FormEjemplo textBtn={"Registrar"}/>
            </div>
        </>
    )
}

export default Registrar