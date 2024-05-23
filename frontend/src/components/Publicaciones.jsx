import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div className="row border-radius">
            {publicaciones.map((publicacion) => (
                <div className="feed" key={publicacion._id}>
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
            ))}
        </div>
    );
};

export default Publicaciones;