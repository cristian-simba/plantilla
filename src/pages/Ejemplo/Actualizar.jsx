import React from 'react'
import { useParams } from 'react-router-dom'
import FormEjemplo from '../../components/Forms/FormEjemplo'


const Actualizar = () => {
    const {id} = useParams()
    return (
        <>
            <div className="p-5 flex flex-col h-screnn">
                <h1 className=" text-2xl font-bold mb-4">Agregar Estudiantes</h1>
                <span className="font-medium text-gray-500 mb-8">Agrega un estudiante más a la lista</span>
                <FormEjemplo textBtn={"Actualizar"}  estudianteId={id} />
            </div>
        </>
    )
}

export default Actualizar