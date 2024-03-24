import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormEjemplo = ({ datosId, textBtn, onNotification }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState('')

    const notifyActualizar = () => {
        toast.success("Registro actualizado con éxito")
    }

    const notifyRegistrar = () => {
        toast.success("Registro guardado con éxito")
    }

    const notifyError = () => {
        toast.error("Ha ocurrido un error")
    }
    
    useEffect(() => {
        if (datosId) {
            obtenerDatos();
        }
    }, [datosId]);

    const obtenerDatos = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estudiantes/${datosId}`);
            const datos = response.data;
            Object.keys(datos).forEach((key) => setValue(key, datos[key]));
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    
    const onSubmit = async (data) => {
        try {
            let response;
            if (datosId) {
                response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/estudiantes/${datosId}`, data);
                notifyActualizar()
            } else {
                response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/estudiantes`, data);
                notifyRegistrar()
                
                // if(response.data.message === "Estudiante registrado"){
                //     console.log("Registro exitoso")
                //     notifyRegistrar()
                //     navigate('/dashboard/estudiantes')
                // }else{
                //     setMensaje(response.data.message)
                //     notify()
                // }
            }
            if (response.status === 201 || response.status === 200) {
                console.log("Datos guardados:", response.data);
                navigate('/dashboard/ejemplo/listar');
            }
        } catch (error) {
            console.error("Error al guardar datos:", error);
            notifyError()
        }
    };

    const notify = () => {
        toast.info(mensaje)
    }
    
    return (
        <div className="grid grid-cols-3 gap-4">
            <ToastContainer/>
            <form onSubmit={handleSubmit(onSubmit)} className="col-span-3">

                <div className="flex flex-col space-y-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Nombre completo del..</label>
                    <input
                        type="text"
                        id="nombre"
                        className={`bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.nombre ? 'border-red-500' : ''}`}
                        placeholder="Ingrese el nombre completo del estudiante"
                        {...register("nombre", { required: "Este campo es requerido" })}
                    />
                    {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}

                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-2">
                            <label htmlFor="cedula" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Cédula</label>
                            <input
                                type="text"
                                id="cedula"
                                className={`mb-2 bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.cedula ? 'border-red-500' : ''}`}
                                placeholder="Ingrese la cédula"
                                {...register("cedula", { 
                                    required: "Este campo es requerido",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "La cédula debe contener exactamente 10 dígitos"
                                    }
                                })}                            />
                            {errors.cedula && <p className="text-red-500 text-sm">{errors.cedula.message}</p>}
                        </div>

                        <div className="flex-2">
                            <label htmlFor="celular" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Número de celular</label>
                            <input
                                type="text"
                                id="celular"
                                className={`mb-2 bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.cedula ? 'border-red-500' : ''}`}
                                placeholder="Ingrese el celular"
                                {...register("celular", { 
                                    required: "Este campo es requerido",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "El celular debe contener exactamente 10 dígitos"
                                    }
                                })}                            />
                            {errors.cedula && <p className="text-red-500 text-sm">{errors.cedula.message}</p>}
                        </div>

                        <div className="flex-1">
                            <label htmlFor="email" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                className={`mb-2 bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="Ingrese el correo"
                                {...register("email", { required: "Este campo es requerido", pattern: { value: /^\S+@\S+$/i, message: 'Correo electrónico inválido' } })}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div className="flex-2">
                            <label htmlFor="genero" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Género</label>
                            <select {...register("genero",{
                                required: true,
                                message: "Seleecion una opcion"
                            })}                                 
                            className={`mb-2 bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.cedula ? 'border-red-500' : ''}`}
>
                            <option value="" disabled selected>Seleccione una opcion</option>
                            <option value="masculino">masculino</option>
                            <option value="femenino">femenino</option>
                            </select>                        
                        </div>

                    </div>

                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                    <input
                        type="text"
                        id="direccion"
                        className={`bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.carrera ? 'border-red-500' : ''}`}
                        placeholder="Ingrese la dirección"
                        {...register("direccion", { required: "Este campo es requerido" })}
                    />
                    {errors.carrera && <p className="text-red-500 text-sm">{errors.carrera.message}</p>}
                </div>
                <button
                    type="submit"
                    className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm sm:w-1/2 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {textBtn}
                </button>
            </form>
        </div>
    );
};

export default FormEjemplo;

{/* PARA MAPEAR EN OTRO LADO EL SELECT
    <select
        id="nombreMateria"
        className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="nombreMateria" 
        onChange={handleChange} 
        value={form.nombreMateria}
    >
        <option>Materias Disponibles</option>
        {materias && materias.length > 0 ? (
            materias.map((materia) => (
                <option key={materia._id} value={materia.nombremateria}>
                    {materia.nombremateria}
                </option>
            ))
        ) : (
            <option disabled>No existen materias registradas</option>
        )}
    </select> */}