import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormEjemplo = ({ estudianteId, textBtn, onNotification }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [mensaje, setMensaje] = ('')

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
        if (estudianteId) {
            obtenerEstudiante();
        }
    }, [estudianteId]);

    const obtenerEstudiante = async () => {
        try {
            const response = await axios.get(`https://65f4cb2bf54db27bc022553c.mockapi.io/api/dashboard/estudiantes/${estudianteId}`);
            const estudiante = response.data;
            Object.keys(estudiante).forEach((key) => setValue(key, estudiante[key]));
        } catch (error) {
            console.error("Error al obtener estudiante:", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            let response;
            if (estudianteId) {
                response = await axios.put(`https://65f4cb2bf54db27bc022553c.mockapi.io/api/dashboard/estudiantes/${estudianteId}`, data);
                notifyActualizar()
            } else {
                response = await axios.post(`https://65f4cb2bf54db27bc022553c.mockapi.io/api/dashboard/estudiantes`, data);
                notifyRegistrar()
            }
            if (response.status === 201 || response.status === 200) {
                console.log("Estudiante guardado:", response.data);
                navigate('/dashboard/ejemplo/listar');
            }
        } catch (error) {
            console.error("Error al guardar estudiante:", error);
            notifyError()
        }
    };

    const notifyMensaje = () => {
        toast.info(mensaje)
    }
    
    return (
        <div className="grid grid-cols-3 gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="col-span-3">
                <div className="flex flex-col space-y-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">Nombre completo del estudiante</label>
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
                        <div className="flex-1">
                            <label htmlFor="email" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                className={`mb-2 bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="Ingrese el correo"
                                {...register("email", { required: "Este campo es requerido", pattern: { value: /^\S+@\S+$/i, message: 'Correo electrónico inválido' } })}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                    </div>
                    <label htmlFor="carrera" className="block text-sm font-medium text-gray-900 dark:text-white">Carrera que se encuentra cursando</label>
                    <input
                        type="text"
                        id="carrera"
                        className={`bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.carrera ? 'border-red-500' : ''}`}
                        placeholder="Ingrese la carrera"
                        {...register("carrera", { required: "Este campo es requerido" })}
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
