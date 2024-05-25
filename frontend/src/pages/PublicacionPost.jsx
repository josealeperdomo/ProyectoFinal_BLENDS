import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/General.css';
import '../styles/Feed.css';
import NavArriba from '../components/NavArriba';
import NavIzq from '../components/NavIzq';
import NavDer from '../components/NavDer';
import fotoejemplo from '../img/photo-1.jpg';

export function PublicacionPost() {
    const { id } = useParams();
    const [publicacion, setPublicacion] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [comentarioError, setComentarioError] = useState(null);

    const token = localStorage.getItem('token');
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const [userId, setUserId] = useState(payload.id);

    useEffect(() => {
        const fetchPublicacion = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/publicaciones/${id}`);
                setPublicacion(response.data);
            } catch (err) {
                setError('Error al obtener la publicación');
            } finally {
                setLoading(false);
            }
        };

        const fetchComentarios = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/comentarios/publicaciones/${id}`);
                setComentarios(response.data);
            } catch (err) {
                console.error('Error al obtener los comentarios:', err);
            }
        };

        fetchPublicacion();
        fetchComentarios();
    }, [id]);

    const handleComentarioChange = (e) => {
        setNuevoComentario(e.target.value);
    };

    const handleComentarioSubmit = async () => {
        if (!nuevoComentario.trim()) {
            setComentarioError("El comentario no puede estar vacío");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/comentarios/publicaciones', {
                id_Publicacion: id,
                usuario_comentario: userId,
                texto: nuevoComentario
            });
            setComentarios([...comentarios, response.data]);
            setNuevoComentario("");
            setComentarioError(null);
        } catch (error) {
            console.error('Error al agregar el comentario:', error);
            setComentarioError('Error al agregar el comentario');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!publicacion) {
        return <div>Publicación no encontrada</div>;
    }

    return (
        <div className="home">
            <div className="lateral-derecha">
                <NavDer />
            </div>
            {/*------------------------ SECCION SUPERIOR---------------*/}
            <NavArriba />

            <section className="seccion-principal">
                {/*------------------------ SECCION LATERAL IZQUIERDA-------------------*/}
                <div className="lateral-izquierda">
                    <NavIzq />
                </div>

                {/*------------------------ SECCION CENTRO API------------------------*/}
                <section className="central-opciones">
                    <div className="seccion-general">
                        <a className="row salir-post" href="javascript:history.back()">
                            <div className="fa fa-arrow-left">
                            </div>
                            <h3>Salir del post</h3>
                        </a>

                        <div className="row border-radius">
                            <div className="feed">
                                <div className="feed_title">
                                    <img src={publicacion.usuario_publicacion.imagen_perfil} alt="" />
                                    <span>
                                        <b>{publicacion.usuario_publicacion.usuario}</b> hizo una <a href="#">Publicacion</a>
                                        <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                                    </span>
                                </div>
                                <div className="feed_content">
                                    <div className="feed_content_image">
                                        <p>{publicacion.texto}</p>
                                    </div>
                                    {publicacion.imagen_publicacion && (
                                        <div className="feed_content_image">
                                            <img src={`${publicacion.imagen_publicacion}`} alt="Imagen de la publicación" />
                                        </div>
                                    )}
                                </div>
                                <div className="feed_footer">
                                    <ul className="feed_footer_left">
                                        <li className="hover-orange selected-orange"><i className="fa fa-heart"></i> 22k</li>
                                        <li><span><b>Jimmy, Andrea</b> and 47 more liked this</span></li>
                                    </ul>
                                    <ul className="feed_footer_right">
                                        <div>
                                            <li className="hover-orange selected-orange"><i className="fa fa-share"></i> 7k</li>
                                            <li className="hover-orange"><i className="fa fa-comments-o"></i> 860 comments</li>
                                        </div>
                                    </ul>
                                </div>
                            </div>

                            <div className="feedcomments">
                                <ul>
                                    {comentarios.map((comentario) => (
                                        <li key={comentario._id}>
                                            <div className="feedcomments-user">
                                                <img src={comentario.usuario_comentario.imagen_perfil} alt="" />
                                                <span>
                                                    <b>{comentario.usuario_comentario.nombre}</b>
                                                    <p>{new Date(comentario.fecha_creacion).toLocaleString()}</p>
                                                </span>
                                            </div>
                                            <div className="feedcomments-comment">
                                                <p>{comentario.texto}</p>
                                            </div>
                                            <div className="feedcomments-foot">
                                                <i className="fa fa-heart"></i>
                                                <span>3 likes</span>
                                                <p>
                                                    <a href="#"><i className="fa fa-reply"></i> reply</a>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="textarea-comentarios">
                                <img src="images/user.jpg" alt="" />
                                <textarea 
                                    placeholder="Comentar"
                                    value={nuevoComentario}
                                    onChange={handleComentarioChange}
                                ></textarea>
                                <p className="fa fa-send" onClick={handleComentarioSubmit}></p>
                                {comentarioError && <p className="error-message">{comentarioError}</p>}
                            </div>
                        </div>
                    </div>
                </section>
                {/*------------------------ SECCION LATERAL DERECHA---------------*/}
            </section>
        </div>
    );
}
