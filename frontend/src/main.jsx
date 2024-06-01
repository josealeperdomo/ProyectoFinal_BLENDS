import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Feed } from './pages/Feed.jsx';
import { PublicacionPost } from './pages/PublicacionPost.jsx';
import { PerfilUser } from './pages/PerfilUser.jsx';
import { Amigos } from './pages/Amigos.jsx';
import { ConfigUser } from './pages/ConfigUser.jsx';
import { CambioContrasena } from './pages/CambioContrasena.jsx';
import { PrivateRoute } from './routes/PrivateRoutes.jsx';
import { AdminsRoutes } from './routes/AdminsRoutes.jsx';
import { PublicRoute } from './routes/PublicRoutes.jsx';
import { Chats } from './pages/Chats.jsx';
import { SocketContextProvider } from './routes/SocketContext.jsx';
import { AuthContextProvider } from './routes/AuthContext.jsx';
import { UsuariosBlendsAdmin } from './pages/UsuariosBlendsAdmin.jsx';
import { PagoMembresiaAdmin } from './pages/PagoMembresiaAdmin.jsx';
import { DetailsUser } from './pages/DetailsUser.jsx';
import { PagoPremium } from './pages/PagoPremium.jsx';
import { PagoEnviado } from './pages/PagoEnviado.jsx';
import { CambioFoto } from './pages/CambioFoto.jsx';
import { EliminarCuenta } from './pages/EliminarCuenta.jsx';
import { Error404 } from './pages/Error404.jsx'
import { RecuContrasena } from './pages/RecuContrasena.jsx';
import { RecuContrasenamail } from './pages/RecuContrasenamail.jsx';
import { IngresarCodigo } from './pages/IngresarCodigo.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( 
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
      <SocketContextProvider>
      <Routes>
        <Route path='/*' element={<Error404/>}/>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recuperacontrasena" element={<RecuContrasena />} />
          <Route path='/ingresarCodigo' element={<IngresarCodigo/>}/>
          <Route path="/recuperacontrasena/:codigo" element={<RecuContrasenamail/>} />
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Feed />} />
            <Route path="/publicacion/:id" element={<PublicacionPost />} />
            <Route path="/perfil/:user" element={<PerfilUser />} />
            <Route path="/amigos" element={<Amigos />} />
            <Route path="/configuracion" element={<ConfigUser />}/>
            <Route path="/cambioContrasena" element={<CambioContrasena />} />
            <Route path='/chats' element={<Chats/>}/>
            <Route path='/PagoPremium' element={<PagoPremium/>}/>
            <Route path='/PagoEnviado' element={<PagoEnviado/>}/>
            <Route path='/cambiofoto' element={<CambioFoto/>}/>
            <Route path='/eliminarCuenta' element={<EliminarCuenta/>}/>

        </Route>

        <Route element={<AdminsRoutes/>}>
          <Route path='/UsuariosBlendsAdmin' element={<UsuariosBlendsAdmin/>}/>
          <Route path='/PagoMembresiaAdmin' element={<PagoMembresiaAdmin/>}/>
          <Route path='/Detailsuser/:id' element={<DetailsUser/>}/>

        </Route>
      </Routes>
      </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

