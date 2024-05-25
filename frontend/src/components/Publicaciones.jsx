import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../styles/Feed.css';
import defaultUserImage from '../img/img-user.png';

const Publicaciones = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicaciones = async () => {
            try {
                const response = await axios.get('http://localhost:3000/publicaciones/all');
                setPublicaciones(response.data);
            } catch (err) {
                setError('Error al obtener las publicaciones');
            }
        };

        fetchPublicaciones();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div> 
            {publicaciones.map((publicacion) => (

                    <div className="row border-radius">
                        <div className="feed">
                            <div className="feed_title">
                                <img src={publicacion.usuario_publicacion ? publicacion.usuario_publicacion.imagen_perfil : defaultUserImage} alt="Imagen de usuario" />
                                <span>
                                    <b>{publicacion.usuario_publicacion ? publicacion.usuario_publicacion.usuario : 'Usuario Desconocido'}</b> hizo una <Link to={`/publicacion/${publicacion._id}`} key={publicacion._id}> <a href="#">Publicacion</a></Link>
                                    <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                                </span>
                            </div>
                            <div className="feed_content">
                                <div className="feed_content_image">
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
        </div>
    );
};

export default Publicaciones;

