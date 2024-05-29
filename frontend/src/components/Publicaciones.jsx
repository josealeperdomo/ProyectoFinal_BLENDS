import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Feed.css';
import { useSocketContext } from '../routes/SocketContext';

const Publicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const [likes, setLikes] = useState({});
    const [userLikes, setUserLikes] = useState({});

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

    useEffect(() => {
        const fetchPublicaciones = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/publicaciones/all');
                setPublicaciones(response.data);

                const likesData = {};
                const userLikesData = {};
                response.data.forEach(publicacion => {
                    likesData[publicacion._id] = publicacion.cantidad_likes || 0;
                    userLikesData[publicacion._id] = false;
                });
                setLikes(likesData);
                setUserLikes(userLikesData);

                response.data.forEach(publicacion => {
                    verificarLike(publicacion._id);
                });
            } catch (err) {
                setError('Error al obtener las publicaciones');
            } finally {
                setLoading(false);
            }
        };

        fetchPublicaciones();
    }, []);

    const verificarLike = async (publicacionId) => {
        try {
            const response = await axios.get(`http://localhost:3000/likes/publicaciones/${publicacionId}/usuario/${userId}/like`);
            setUserLikes(prevUserLikes => ({
                ...prevUserLikes,
                [publicacionId]: response.data.liked
            }));
        } catch (error) {
            console.error('Error al verificar el like:', error);
        }
    };

    const handleLike = async (publicacionId) => {
        try {
            const response = await axios.post(`http://localhost:3000/likes/publicaciones/${publicacionId}/like`, {
                id_usuario: userId
            });
            setLikes(prevLikes => ({
                ...prevLikes,
                [publicacionId]: response.data.cantidad_likes
            }));
            setUserLikes(prevUserLikes => ({
                ...prevUserLikes,
                [publicacionId]: true
            }));
        } catch (error) {
            console.error('Error al dar like:', error);
        }
    };

    const handleUnlike = async (publicacionId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/likes/publicaciones/${publicacionId}/unlike/${userId}`);
            setLikes(prevLikes => ({
                ...prevLikes,
                [publicacionId]: response.data.cantidad_likes
            }));
            setUserLikes(prevUserLikes => ({
                ...prevUserLikes,
                [publicacionId]: false
            }));
        } catch (error) {
            console.error('Error al quitar like:', error);
        }
    };

    const handleMenuToggle = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/publicaciones/${id}`);
            setPublicaciones(publicaciones.filter(publicacion => publicacion._id !== id));
        } catch (err) {
            console.error('Error al eliminar la publicación:', err);
        }
    };

    const handleEdit = (id) => {
        console.log('Editar publicación:', id);
    };

    const handleReport = (id) => {
        console.log('Reportar publicación:', id);
    };

    if (error) {
        return <div>{error}</div>;
    }
    const {onlineUsers} = useSocketContext();

    return (
        <div>
            {publicaciones.map((publicacion) => (
                <div className="row border-radius" key={publicacion._id}>
                    <div className="feed">
                        <div className="feed_title">
                            <div className={onlineUsers.includes(publicacion.usuario_publicacion._id) ? "circleGreen" : "circleGray"}></div>
                            <img src={publicacion.usuario_publicacion.imagen_perfil} alt="" />
                            <span>
                                <b><a href={`/perfil/${publicacion.usuario_publicacion.usuario}`}>{publicacion.usuario_publicacion.usuario}</a></b> hizo una <a href={`/publicacion/${publicacion._id}`}>Publicacion</a>
                                <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                            </span>
                            <div className="menu-container">
                                <button className="menu-button" onClick={() => handleMenuToggle(publicacion._id)}>...</button>
                                {activeMenu === publicacion._id && (
                                    <div className="menu-dropdown">
                                        {userId !== publicacion.usuario_publicacion._id ? (
                                            <button onClick={() => handleReport(publicacion._id)}>Reportar</button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(publicacion._id)}>Editar</button>
                                                <button onClick={() => handleDelete(publicacion._id)}>Eliminar</button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="feed_content">
                            <div className="feed_content_text">
                                <p>{publicacion.texto}</p>
                            </div>
                            {publicacion.imagen_publicacion && (
                                <div className="feed_content_image">
                                    <img src={publicacion.imagen_publicacion} alt="Imagen de la publicación" />
                                </div>
                            )}
                        </div>
                        <div className="feed_footer">
                            <ul className="feed_footer_left">
                                <li className="hover-orange selected-orange" onClick={() => userLikes[publicacion._id] ? handleUnlike(publicacion._id) : handleLike(publicacion._id)}>
                                    <i className={`fa ${userLikes[publicacion._id] ? 'fa-heart' : 'fa-heart-o'}`}></i> {likes[publicacion._id]}
                                </li>
                                <li></li>
                            </ul>
                            <ul className="feed_footer_right">
                                <div>
                                    <li className="hover-orange selected-orange"><i className="fa fa-share"></i> 7k</li>
                                    <li className="hover-orange"><i className="fa fa-comments-o"></i> 860 comments</li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default Publicaciones;