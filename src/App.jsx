import {BrowserRouter,Routes,Route} from 'react-router-dom'
import NotFound from './pages/NotAuthorized/NotFound'
import Login from './pages/Login'
import Dashboard from './layout/Dashboard'
import Listar from './pages/Ejemplo/Listar'
import Registrar from './pages/Ejemplo/Registrar'
import Actualizar from './pages/Ejemplo/Actualizar'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard/" element={<Dashboard />} >
          <Route path='ejemplo'/>
          <Route path='ejemplo/listar' element={<Listar/>}/>
          <Route path='ejemplo/registrar' element={<Registrar/>}/>
          <Route path='ejemplo/actualizar/:id' element={<Actualizar/>}/>
          
        </Route>

        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


{ /* RUTAS ANIDADAS
  <Route path="/dashboard" element={<Dashboard />} >
    <Route path='estudiantes/' element={<ListarEstudiantes/>}/>

    <Route path='estudiantes/agregar-estudiante' element={<AgregarEstudiante/>}/>
    <Route path='estudiantes/actualizar-estudiante/:id' element={<ActualizarEstudiante/>}/>

</Route>
*/}