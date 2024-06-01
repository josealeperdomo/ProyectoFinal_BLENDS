import React, { useEffect, useLayoutEffect, useState } from 'react';
import "../styles/General.css";
import "../styles/Components.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    const [amigos, setAmigos] = useState([]);
    const [cantidadAmigos, setCantidadAmigos] = useState([]);



    useLayoutEffect(() => {
        const obtenerUsuarioPorId = async (usuarioid) => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${usuarioid}`);
                setInfoUsuario(response.data);
                const amigosData = response.data.amigos;
                if (Array.isArray(amigosData)) {
                    setAmigos(amigosData);
                    setCantidadAmigos(amigosData.length);
                } else {
                    setAmigos([]);
                    console.log('No hay amigos');
                }
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
                        {infoUsuario?.membresia == 'premium' ? <img className='verifi2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png" style={{width: "15px", height: "15px" }} alt="" /> : <div></div>}
                        <span>{infoUsuario?.usuario}<p>{cantidadAmigos} amigo(s)</p></span>
                    </div>
                </div>
                <div className="rowmenu">
                    <div className='rowmenu-ul'>
                        <li ><Link to="/home"><i className="fa fa-globe" ></i>Nuevas publicaciones</Link></li>
                        <li><Link to={`/perfil/${infoUsuario?.usuario}`}><i className="fa fa-user"></i>Mi perfil</Link></li>
                        <li><Link to="/amigos"><i className="fa fa-users"></i>Mis amigos</Link></li>
                        <li><Link to="/chats"><i className="fa fa-comments-o"></i>Mis chats</Link></li>
                        {infoUsuario?.membresia != 'premium' ? <li><Link to="/PagoPremium"><i className="fa fa-money"></i>Comprar premiun</Link></li> : <div></div>}
                    </div>
                
                
                </div>
                </div>
                
            </section>
             
        </>
    );
}

export default NavIzq;