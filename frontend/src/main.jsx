import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Feed } from './pages/Feed.jsx';
import { PublicacionPost } from './pages/PublicacionPost.jsx';
import { PerfilUser } from './pages/PerfilUser.jsx';
import { Amigos } from './pages/Amigos.jsx';
import { ConfigUser } from './pages/ConfigUser.jsx';
import { CambioContrasena } from './pages/CambioContrasena.jsx';
import { PrivateRoute } from './routes/PrivateRoutes.jsx';
import { PublicRoute } from './routes/PublicRoutes.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoute/>}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
          
        
        <Route element={<PrivateRoute/>}>
          <Route path="/home" element={<Feed />} />
            <Route path="/Publicacion" element={<PublicacionPost />} />
            <Route path="/perfil" element={<PerfilUser />} />
            <Route path="/amigos" element={<Amigos />} />
            <Route path="/configuracion" element={<ConfigUser />}/>
            <Route path="/cambioContrasena" element={<CambioContrasena />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
