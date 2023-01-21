import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthProvider'
import RutaProtegida from './layout/RutaProtegida'
import Actualizar from './pages/Actualizar'
import Create from './pages/Create'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Area Publica */}
          <Route path='/' element={<Login />} />

          {/* Aprea Privada */}
          <Route path='/propiedades' element={<RutaProtegida />}>
            <Route index element={<Dashboard />} />
            <Route path='nuevo' element={<Create />} />
            <Route path='actualizar/:id' element={<Actualizar />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
