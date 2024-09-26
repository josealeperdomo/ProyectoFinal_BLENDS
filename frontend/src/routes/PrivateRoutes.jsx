import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export function PrivateRoute() {
    const [tokenValido, setTokenValido] = useState(null); // Inicialmente null para mostrar el estado de carga

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtener el token de localStorage

        const validarSesion = async () => {
            try {
                const response = await axios.get('https://estudiantes12.backendprueba.xyz/login/verifyToken', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const informacion = response.data.exists;
                if (informacion) {
                    setTokenValido(true);
                } else {
                    setTokenValido(false);
                }
            } catch (error) {
                console.error('Error verifying token:', error);
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

    return tokenValido ? <Outlet /> : <Navigate to='/' />;
}