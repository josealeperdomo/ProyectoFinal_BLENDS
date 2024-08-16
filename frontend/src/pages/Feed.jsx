import "../styles/General.css";
import "../styles/Feed.css"
import NavArriba from "../components/NavArriba"; 
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import Publicaciones from "../components/Publicaciones";
import axios, { Axios } from "axios";
import { useState, useEffect } from "react";

export function Feed(){

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
    const [texto, setTexto] = useState('');
    const [imagen, setImagen] = useState(null);
    const [infoUsuario, setInfoUsuario] = useState(null);


    useEffect(() => {
        const obtenerUsuarioPorId = async (usuarioid) => {
            try {
                const response = await axios.get(`http://sa.backendprueba.xyz:3001/users/${usuarioid}`);
                setInfoUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        obtenerUsuarioPorId(userId);
    }, [userId]);

    const publicar = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('texto', texto);
        formData.append('imagen_publicacion', imagen);
        formData.append('usuario_publicacion', userId);

        try {
            await axios.post('http://sa.backendprueba.xyz:3001/publicaciones', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
                
            });
            setTexto("")
            setImagen(null)
            document.getElementById('textoinput').value = ""
            location.reload();
        } catch (error) {
            console.error('Error al publicar:', error);
        }
    };

    return(
        <>
            <div className="home">
        {/*------------------------ SECCION LATERAL DERECHA---------------*/}
          <div className="lateral-derecha"> <NavDer /> </div>
        

        <section className="seccion-principal">

          {/*------------------------ SECCION LATERAL IZQUIERDA-------------------*/}
          <div className="lateral-izquierda"><NavIzq /></div>
          
          {/*------------------------ SECCION CENTRO API------------------------*/}
          <section className="central-opciones" >
            <div className="seccion-general">
            <div className="row">
                <div className="publish">
                    <div className="row_title">
                        <span><i className="fa fa-newspaper-o" aria-hidden="true"></i> Status</span>

                    </div>
                    <form method="" onSubmit={publicar}>
                        <div className="publish_textarea">
                            <img className="border-radius-image" src={infoUsuario?.imagen_perfil} alt="" />
                            <textarea type="text" id="textoinput" style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', lineHeight: '1.5', borderRadius: '5px', outline: 'none', resize: 'none', overflow: 'auto' }} placeholder={`¿Qué estás pensando, ${infoUsuario?.usuario}?`} onChange={(e) => {setTexto(e.target.value)
                                console.log(texto)
                            }}/>
                        </div>
                        <div className="publish_icons">
                            <ul>
                            <li>
                                <label htmlFor="fileInput">
                                    <i className="fa fa-camera"></i>
                                </label>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImagen(e.target.files[0])}
                                    style={{ display: 'none' }} 
                                />
                            </li>

                            </ul>
                            <button>Publish</button>
                        </div>
                    </form>
                </div>
            </div>

            <Publicaciones/>

            </div>
          </section>
          {/*------------------------ SECCION SUPERIOR---------------*/}
        <NavArriba />

          
        </section>
      </div>
        </>
    )
}