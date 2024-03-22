import React, { createContext, useContext, useState } from "react";
import { User2, ChevronFirst, ChevronLast, MoreVertical, DoorOpen } from "lucide-react";
import logo from "../assets/logo.webp";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('logged'); // Eliminar la sesión del usuario
    navigate('/login', {
      replace: true,
    });
  };

  return (
    <>
      <div className="flex"></div>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-2 pb-2 flex justify-between items-center">
            <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"} px-4 py-4`} />
            <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex px-3">
            <User2 size={20} className="rounded-md h-12 items-center m-auto" />
            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
              <div className="leading-4">
                <h2 className="font-semibold text-sm">{localStorage.getItem('username')}</h2>

                <span className="text-xs text-gray-600">Usuario</span>
              </div>

              <div >
                <button onClick={() => setIsOpen((prev) => !prev)}>
                  {!isOpen ? (
                    <MoreVertical size={20}
                      className="cursor-pointer"
                    />
                  ) : (
                    <MoreVertical size={20}
                      className="cursor-pointer"
                    />
                  )}
                </button>
                {isOpen && (
                  <div className="absolute bottom-14 left-28 bg-gray-100 rounded-lg">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 mx-4 my-0.5">
                      <button
                        onClick={onLogout}
                        className="flex gap-2 bg-red-600 texfont-medium text-white dark:text-red-500 px-4 py-2 border-red-500 rounded-md hover:no-underline">Cerrar sesión
                        <DoorOpen size={20} />
                      </button>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>
        </div>
      )}

      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {text}
        </div>
      )}
    </li>
  );
}
