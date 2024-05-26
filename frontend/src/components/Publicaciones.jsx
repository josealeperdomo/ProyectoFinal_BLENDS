import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Feed.css';
import { useSocketContext } from '../routes/SocketContext';

const Publicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);

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
            } catch (err) {
                setError('Error al obtener las publicaciones');
            } finally {
                setLoading(false);
            }
        };

        fetchPublicaciones();
    }, []);

    const handleMenuToggle = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/publicaciones/${id}`);
            // Actualizar la lista de publicaciones después de eliminar una
            setPublicaciones(publicaciones.filter(publicacion => publicacion._id !== id));
        } catch (err) {
            console.error('Error al eliminar la publicación:', err);
        }
    };

    const handleEdit = (id) => {
        // Aquí puedes redirigir a una página de edición o mostrar un modal de edición
        console.log('Editar publicación:', id);
    };

    const handleReport = (id) => {
        // Aquí puedes implementar la lógica para reportar la publicación
        console.log('Reportar publicación:', id);
    };

    if (error) {
        return <div>{error}</div>;
    }
    const {onlineUsers} = useSocketContext()
    return (
        <div>
            {publicaciones.map((publicacion) => (
                <div className="row border-radius" key={publicacion._id}>
                    <div className="feed">
                        <div className="feed_title">
                            <div className={onlineUsers.includes(publicacion.usuario_publicacion._id) ? "circleGreen":"circleGray"}></div>
                            <img src={publicacion.usuario_publicacion.imagen_perfil} alt="" />
                            <span>
                                <b>{publicacion.usuario_publicacion.usuario}</b> hizo una <a href={`/publicacion/${publicacion._id}`}>Publicacion</a>
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
                </div>
            ))}
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default Publicaciones;