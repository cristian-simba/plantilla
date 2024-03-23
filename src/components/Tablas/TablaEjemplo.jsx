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
    const [originalDatos, setOriginalDatos] = useState([]); // Agrega estado para almacenar los datos originales
    const [search, setSearch] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [porPagina] = useState(6);
    const [datos, setDatos] = useState([])
    const columnasDatos = ["cedula" , "nombre", "email", "carrera"]
    

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
        const obtenerDatos = async() => {
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estudiantes`)
                setDatos(response.data)
                setOriginalDatos(response.data);
                console.log(response.data)
            }catch(error){
                console.log(error)
                notifyErrorObtener()
            }
        }
        obtenerDatos()
    }, [])

    const eliminarDato = async (datoID) => {
        try{
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/estudiantes/${datoID}`)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estudiantes`)
            setDatos(response.data) 
            setOriginalDatos(response.data);
            notifyEliminar()
        }catch(error){
            console.log(error)
            notifyErrorEliminar()
        }
    }

    {/*CONSTANTES PARA LA PAGINACIÓN BUSQUEDA, SOLO VALE CAMBIAR EL NUMERO 
        DE DATOS QUE SE QUIERE MOSTRAR EN PANTALLA
    */}


    const buscador = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearch(searchTerm);
        if (searchTerm === "") {
            setDatos(originalDatos); // Restaurar los datos originales cuando el término de búsqueda está vacío
        } else {
            const filtrarElementos = originalDatos.filter((dato) => {
                return dato.nombre.toLowerCase().includes(searchTerm);
            });
            setDatos(filtrarElementos);
        }
    };

    {/*CONSTANTES PARA LA PAGINACIÓN, SE PUEDE CAMBIAR SOLO EL NÚMERO DE 
        ELEMENTOS QUE SE QUIERE MOSTRAR, NO ES NECESARIO CAMBIAR NADA
    */}
    
    const ultimoIndice = paginaActual * porPagina;
    const primerIndice = ultimoIndice - porPagina;
    const actuales = [];
    for (let i = primerIndice; i < ultimoIndice && i < datos.length; i++) {
        actuales.push(datos[i]);
    }
    
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina); 

    return (
     <>
        <div className="flex flex-row justify-between">
            <div className="flex-grow">
                <SearchBar searchValue={search} onSearch={buscador} />
            </div>
            <AddRecordButton text="datos" to="/dashboard/ejemplo/registrar" />
        </div>
            <Tabla datos={actuales} columnas={columnasDatos}
            eliminar={eliminarDato} textoEliminar={"Datos"}
            noEncontrado={"datos"}
            actualizarPath={"/dashboard/ejemplo/actualizar"}
            />
            <Paginacion paginaActual={paginaActual} 
            paginasTotales={Math.ceil(datos.length / porPagina)}
            cambiarPagina={cambiarPagina} />

     </>
    )
}

export default TablaEjemplo
