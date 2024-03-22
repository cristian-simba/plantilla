import React, { useState, useEffect } from 'react';
import Sidebar, { SidebarItem } from "./Sidebar";
import { UsersRound, Notebook, SquarePen } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NotAuthorized from '../pages/NotAuthorized/NotAuthorized';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('/dashboard/estudiantes');
  const { state: locationState, } = useLocation();
  const [logged, setLogged] = useState(false); // Estado de autenticación
  const [renderNotAuthorized, setRenderNotAuthorized] = useState(false);

  // Verificar el estado de autenticación al cargar el componente
  useEffect(() => {
    const isUserLogged = localStorage.getItem('logged');
    if (isUserLogged === 'true') {
      setLogged(true);
    } else {
      setTimeout(() => {
        setRenderNotAuthorized(true);
      }, 500); // Renderizar NotAuthorized después de 1 segundo
    }
  }, []);

  // Verificar si la ubicación actual es la misma que el item seleccionado
  const isItemSelected = (item) => {
    return locationState?.pathname === item;
  };

  // Manejar el clic en un item del sidebar
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };


  {/*CAMBIAR LAS RUTAS, TEXT E IMAGENES DEL SIDEBAR
    /dashboard/ruta_de_APP
*/}
  return (
    <>
      {logged ? (
        <div className="flex">
          <ToastContainer/>
          <Sidebar>
            <Link to="/dashboard/ejemplo/listar">
              <SidebarItem
                icon={<UsersRound size={20} />}
                text="Ruta 1"
                active={isItemSelected('/dashboard/ejemplo/registrar')}
                onClick={() => handleItemClick('/dashboard/ejemplo/registrar')}
              />
            </Link>
            <Link to="ruta 2">
              <SidebarItem
                icon={<Notebook size={20} />}
                text="Ruta 2"
                active={isItemSelected('ruta 2')}
                onClick={() => handleItemClick('ruta 2')}
              />
            </Link>
            <Link to="ruta 3">
              <SidebarItem
                icon={<SquarePen size={20} />}
                text="Ruta 3"
                active={isItemSelected('ruta 3')}
                onClick={() => handleItemClick('ruta 3')}
              />
            </Link>
          </Sidebar>
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      ) : (
        renderNotAuthorized && <NotAuthorized />
      )}
    </>
  );
};

export default Dashboard;
