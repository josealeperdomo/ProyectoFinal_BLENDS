import React, { useEffect, useState } from 'react';
import "../styles/General.css";
import "../styles/Components.css";
import axios from 'axios';


function NavIzq() {

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


    return (
        <>    
            <section className="lateral-izquierda-opciones shadow">
                <div className="left_row">
                <div className="left_row_profile">
                    
                    <div className="left_row_profile">
                        <img id="profile_pic" src={infoUsuario?.imagen_perfil} />
                        <span>{infoUsuario?.usuario}<p>150k followers / 50 follow</p></span>
                    </div>
                </div>
                <div className="rowmenu">
                    <div className='rowmenu-ul'>
                        <li ><a href="/home"><i className="fa fa-globe" ></i>Nuevas publicaciones</a></li>
                        <li><a href="/perfil"><i className="fa fa-user"></i>Mi perfil</a></li>
                        <li><a href="/amigos"><i className="fa fa-users"></i>Mis amigos</a></li>
                        <li><a href="/chats"><i className="fa fa-comments-o"></i>Mis chats</a></li>
                        <li><a href="index.html"><i className="fa fa-money"></i>Comprar premiun</a></li>

                    </div>
                
                
                </div>
                </div>
                
            </section>
             
        </>
    );
}

export default NavIzq;