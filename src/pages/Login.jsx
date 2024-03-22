import React, { useState, useEffect } from 'react';
import imagen from '../assets/loginImg.webp';
import { useNavigate } from 'react-router-dom';
import Mensaje from '../components/Alerts/Mensaje';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('logged');
    if (isUserLoggedIn) {
      navigate('/dashboard'); 
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { username, password });
      if (response.status === 200) {
        localStorage.setItem('logged', 'true');
        localStorage.setItem('username', username);
        console.log(response.data)
        navigate('/dashboard', {
          replace: true,
          state: {
            logged: true,
            username,
          },
        });
      }
    } catch (error) {
      setMensaje({ response: error.response.data.message, tipo: false });
      console.log(error.response);
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center justify-center h-screen">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="mb-2 text-4xl font-bold">Caso 1</span>
            <span className="font-light text-gray-400 mb-4">Por favor ingresa tus credenciales</span>

            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.response}</Mensaje>}

            <div className="mt-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de usuario</label>
              <input type="text" id="username" className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese su nombre de usuario" required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />

            </div>
            <div className="mt-4 mb-8">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
              <input type="password" id="password" className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Iniciar Sesión
            </button>
          </div>

          <div className="relative">
            <img
              src={imagen}
              alt="Imagen del Login (loginImg)"
              className="w-[400px] h-[500px] hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
