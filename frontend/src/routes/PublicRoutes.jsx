import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export function PublicRoute() {
    const [tokenValido, setTokenValido] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); 

        const validarSesion = async () => {
            try {
                const response = await axios.get('http://sa.backendprueba.xyz:3001/login/verifyToken', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const informacion = response.data.exists;
                setTokenValido(informacion);
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
        return <div>Cargando...</div>; 
    }

    return tokenValido ? <Navigate to='/home' /> : <Outlet />;
}
