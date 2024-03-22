import React from "react";
import { Ghost } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {

  const navigate = useNavigate()
  const {state} = useLocation()

  const onReturn = () => {
    const isUserLogged = localStorage.getItem('logged');
    if (isUserLogged === 'true') {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4">
          <Ghost size={160} className="text-gray-400 inline-block" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Página no encontrada</h1>
        <h2 className="text-md text-gray-800 mb-4">Lo siento, no pudimos encontrar la página que estás buscando.</h2>
        <button 
        onClick={onReturn}
        type="submit" 
        className="text-white mb-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Regresar
        </button>
      </div>
    </div>
  );
};

export default NotFound;
