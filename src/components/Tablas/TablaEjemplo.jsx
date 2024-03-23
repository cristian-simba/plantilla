import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SearchBar from '../SearchBar'
import AddRecordButton from '../AddRecordButton'
import Tabla from '../Tablas/Tabla'
import Paginacion from '../Pagination'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TablaEjemplo = () => {

    {/*CONSTANTES PARA OBTENER Y SETEAR DATOS EN LA TABLA,
        OJO CON LA SINTAXIS DE COMO DECLARAR LAS COLUMNAS
    */}

    const [estudiantes, setEstudiantes] = useState([])
    const columnasEstudiantes = ["cedula" , "nombre", "email", "carrera"]

    const notifyEliminar = () => {
        toast.success("Se elimino el registro")
      }

    const notifyErrorEliminar = () => {
        toast.error("Ha ocurrido un error al eliminar")
    }

    const notifyErrorObtener = () => {
        toast.error("Ha ocurrido al obtener los datos")
    }

    useEffect(()=>{
        const obtenerEstudiante = async() => {
            try{
                const response = await axios.get("https://65f4cb2bf54db27bc022553c.mockapi.io/api/dashboard/estudiantes")
                setEstudiantes(response.data)
                setOriginalBusqueda(response.data);
                console.log(response.data)
            }catch(error){
                console.log(error)
                notifyErrorObtener()
            }
        }
        obtenerEstudiante()
    }, [])

    const eliminarEstudiante = async (estudianteID) => {
        try{
            await axios.delete(`https://65f4cb2bf54db27bc022553c.mockapi.io/api/dashboard/estudiantes/${estudianteID}`)
            const response = await axios.get("https://65f4cb2bf54db27bc022553c.mockapi.io/api/dashboard/estudiantes")
            setOriginalBusqueda(response.data);
            setEstudiantes(response.data) 
            notifyEliminar()
        }catch(error){
            console.log(error)
            notifyErrorEliminar()
        }
    }

    {/*CONSTANTES PARA LA PAGINACIÓN BUSQUEDA, SOLO VALE CAMBIAR EL NUMERO 
        DE DATOS QUE SE QUIERE MOSTRAR EN PANTALLA
    */}

    
    const [originalBusqueda, setOriginalBusqueda] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const handleSearch = (e) => {
        setBusqueda(e.target.value.toLowerCase());
    };

    const filtrarElementos = originalBusqueda.filter((estudiante) => {
        return (
            estudiante.nombre.toLowerCase().includes(busqueda) ||
            estudiante.email.toLowerCase().includes(busqueda) ||
            estudiante.carrera.toLowerCase().includes(busqueda) ||
            estudiante.cedula.toString().includes(busqueda)
        );
    });

    {/*CONSTANTES PARA LA PAGINACIÓN, SE PUEDE CAMBIAR SOLO EL NÚMERO DE 
        ELEMENTOS QUE SE QUIERE MOSTRAR, NO ES NECESARIO CAMBIAR NADA
    */}

    const [paginaActual, setPaginaActual] = useState(1);
    const [porPagina] = useState(6);
    
    const ultimoIndice = paginaActual * porPagina;
    const primerIndice = ultimoIndice - porPagina;
    const actuales = [];
    for (let i = primerIndice; i < ultimoIndice && i < estudiantes.length; i++) {
        actuales.push(estudiantes[i]);
    }
    
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina); 

    return (
     <>
        <div className="flex flex-row justify-between">
            <div className="flex-grow">
                <SearchBar onSearch={handleSearch}/>
            </div>
            <AddRecordButton text="estudiantes" to="/dashboard/ejemplo/registrar" />
        </div>
            <Tabla datos={actuales} columnas={columnasEstudiantes}
            eliminar={eliminarEstudiante} textoEliminar={"Estudiante"}
            noEncontrado={"estudiantes"}
            actualizarPath={"http://localhost:5173/dashboard/ejemplo/actualizar"}
            />
            <Paginacion paginaActual={paginaActual} paginasTotales={Math.ceil(filtrarElementos.length / porPagina)} cambiarPagina={cambiarPagina} />

     </>
    )
}

export default TablaEjemplo