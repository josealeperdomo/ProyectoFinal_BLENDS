import "../styles/General.css";
import "../styles/Chats.css"
import '../styles/Feed.css';
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import { SidebarChat } from "../components/SidebarChat";
import { useState, useEffect } from "react";
import { Messages } from "../components/Messages";
import axios from "axios";

export function Chats(){
    const getTokenPayload = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
    
        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            return JSON.parse(payloadJson);
        } catch (error) {
            console.error('Error parsing token payload:', error);
            return null;
        }
    };
    
    const payload = getTokenPayload();
    const userId = payload ? payload.id : null;
    const [infoUsuario, setInfoUsuario] = useState(null);

    useEffect(() => {
        const obtenerUsuarioPorId = async (usuarioid) => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${usuarioid}`);
                setInfoUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        obtenerUsuarioPorId(userId);
    }, [userId]);
    return(
        <>
            <div className="home">
        {/*------------------------ SECCION SUPERIOR---------------*/}
        <NavArriba />

        <section className="seccion-principal">

          {/*------------------------ SECCION LATERAL IZQUIERDA-------------------*/}
          <div className="lateral-izquierda"><NavIzq /></div>
          
          {/*------------------------ SECCION CENTRO API------------------------*/}


        </section>
          <section className="center">
                <SidebarChat/>
                <Messages/>
            </section>
          {/*------------------------ SECCION LATERAL DERECHA---------------*/}
          <div className="lateral-derecha"> <NavDer /> </div>
          
        
      </div>
        </>
    )
}
