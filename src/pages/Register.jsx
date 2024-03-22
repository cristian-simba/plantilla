import React, { useState } from 'react';
import imagen from '../assets/registroImg.webp';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../components/Alerts/Mensaje';

const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState({})


  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login/register`, {username, password, email})
      if(response.status === 200){
        console.log(response);
        navigate('/login');
      }
    }catch(error){
      setMensaje({response: error.response.data.error, tipo:false});
      console.log(error.response); 
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} className="flex items-center justify-center h-screen">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="relative">
          <img
            src={imagen}
            alt="Imagen del Login (loginImg)"
            className="w-[400px] h-full hidden rounded-l-2xl md:block object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-9">
          <span className="mb-3 text-4xl font-bold">Caso 1</span>
          <span className="font-light text-gray-400 mb-4">
            Por favor completa el formulario de registro
          </span>
          {mensaje && mensaje.response && <Mensaje tipo={mensaje.tipo}>{mensaje.response}</Mensaje>}
          <div className="mt-4">
            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de usuario</label>
            <input type="text" id="text" className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese su nombre completo" required 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
            <input type="email" id="email" className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese su correo electrónico" required 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mt-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
              <input type="password" id="password" className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
          </div> 

          <div className="flex justify-between w-full py-4">
            <button type="submit" className="w-full text-white mb-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Registrate
            </button>
          </div>

          <div className="text-center text-sm text-gray-400">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="font-semibold text-black"> Iniciar sesión</Link>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default Register;
