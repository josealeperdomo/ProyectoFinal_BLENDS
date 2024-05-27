import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/General.css';
import '../styles/Feed.css';
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import { useSocketContext } from '../routes/SocketContext';

export function PublicacionPost() {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);
  const { onlineUsers } = useSocketContext(); // useContext hook siempre debe estar en la parte superior

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/comentarios/publicaciones/${id}`);
      setComentarios(response.data);
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  };

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/publicaciones/${id}`);
        setPublicacion(response.data);
        setLikes(response.data.likes);
      } catch (error) {
        console.error('Error al obtener los detalles de la publicación:', error);
      }
    };

    fetchPublicacion();
    fetchComentarios();
  }, [id]);

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('Usuario no autenticado');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const usuario_comentario = decodedToken.id;

      await axios.post(`http://localhost:3000/comentarios/publicaciones`, {
        id_Publicacion: id,
        usuario_comentario,
        texto: comentario,
      }, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      fetchComentarios();

      setComentario('');
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      setError('Error al enviar el comentario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Usuario no autenticado');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const id_usuario = decodedToken.id;

      const response = await axios.get(`http://localhost:3000/likes/publicaciones/${id}/usuario/${id_usuario}/like`);
      const liked = response.data.liked;

      if (liked) {
        // Si el usuario ya dio like, quitar el like
        await quitarLike(id);
        setLikes(likes => likes - 1);
      } else {
        // Si el usuario no ha dado like, dar el like
        await darLike(id);
        setLikes(likes => likes + 1);
      }
    } catch (error) {
      console.error('Error al manejar el like:', error);
      setError('Error al manejar el like. Por favor, inténtalo de nuevo.');
    }
  };

  const darLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const id_usuario = decodedToken.id;

      await axios.post(`http://localhost:3000/likes/publicaciones/${id}/like`, {
        id_usuario: id_usuario
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw new Error('Error al dar like: ' + error.message);
    }
  };

  const quitarLike = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const id_usuario = decodedToken.id;

      await axios.delete(`http://localhost:3000/likes/publicaciones/${id}/unlike/${id_usuario}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Like quitado');
    } catch (error) {
      throw new Error('Error al quitar like: ' + error.message);
    }
  };

  if (!publicacion) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="home">
      <div className="lateral-derecha">
        <NavDer />
      </div>
      <NavArriba />
      <section className="seccion-principal">
        <div className="lateral-izquierda">
          <NavIzq />
        </div>
        <section className="central-opciones">
          <div className="seccion-general">
            <a className="row salir-post" onClick={() => window.history.back()}>
              <div className="fa fa-arrow-left"></div>
              <h3>Salir del post</h3>
            </a>
            <div className="row border-radius">
              <div className="feed">
                <div className="feed_title">
                  <div className={onlineUsers.includes(publicacion.usuario_publicacion._id) ? "circleGreen":"circleGray"}></div>
                  <img src={publicacion.usuario_publicacion.imagen_perfil} alt="" />
                  <span>
                    <b>{publicacion.usuario_publicacion.usuario}</b> hizo una{" "}
                    <a href="#">Publicacion</a>
                    <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                  </span>
                </div>
                <div className="feed_content">
                  <div className="feed_content_image">
                    <p>{publicacion.texto}</p>
                  </div>
                  <div className="feed_content_image">
                    <img src={publicacion.imagen_publicacion} alt="" />
                  </div>
                </div>
                <div className="feed_footer">
                  <ul className="feed_footer_left">
                    <li className="hover-orange selected-orange">
                      <i className="fa fa-heart" onClick={handleLike}></i> {likes} Likes
                    </li>
                    <li>
                      <span>
                        <b>Jimmy, Andrea</b> y 47 más les gustó esto
                      </span>
                    </li>
                  </ul>
                  <ul className="feed_footer_right">
                    <div>
                      <li className="hover-orange selected-orange">
                        <i className="fa fa-share"></i> 7k
                      </li>
                      <li className="hover-orange">
                        <i className="fa fa-comments-o"></i> {comentarios.length} comentarios
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="feedcomments">
                <ul>
                  {comentarios.map(comentario => (
                    <li key={comentario._id}>
                      <div className="feedcomments-user">
                        <img src={comentario.usuario_comentario.imagen_perfil} alt="" />
                        <span>
                          <b>{comentario.usuario_comentario.usuario}</b>
                          <p>{new Date(comentario.fecha_creacion).toLocaleString()}</p>
                        </span>
                      </div>
                      <div className="feedcomments-comment">
                        <p>{comentario.texto}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="textarea-comentarios">
                <img src="" alt="Imagen de usuario"/>
                <form onSubmit={handleSubmitComentario}>
                  <input
                    type="text"
                    placeholder="Comentar"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                  <button type="submit" className="fa fa-send"></button>
                </form>
                {error && <div className="error-message">{error}</div>}
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
