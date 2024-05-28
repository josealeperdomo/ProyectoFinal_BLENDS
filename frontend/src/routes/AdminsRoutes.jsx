import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export function AdminsRoutes() {
    const [tokenValido, setTokenValido] = useState(null);
    const [esAdmin, setEsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Usuario no autenticado');
          return;
        }
  
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const id_usuario = decodedToken.id;  

        const validarSesion = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id_usuario}`,);

                const informacion = response.data;
                if (informacion) {
                    setTokenValido(true);
                    setEsAdmin(informacion.rol === 'admin'); // Verificar si el rol es 'admin'
                }
            } catch (error) {
                setTokenValido(false);
            }
        };

        if (token) {
            validarSesion();
        } else {
            setTokenValido(false);
        }
    }, []);

    if (tokenValido === null) {
        return <div>Cargando...</div>; // Mostrar un estado de carga mientras se valida el token
    }

    return tokenValido && esAdmin ? <Outlet /> : <Navigate to='/' />;
}