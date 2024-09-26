import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/General.css';
import '../styles/Feed.css';
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import { useSocketContext } from '../routes/SocketContext';
import menuPubli from "../assets/menucopubli.svg";

export function PublicacionPost() {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [error, setError] = useState(null);
  const { onlineUsers } = useSocketContext();
  const [infoUsuario, setInfoUsuario] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [imagendeperfil, setImagendeperfil] = useState("https://estudiantes12.backendprueba.xyz/public/img-user.png");

  const handleMenuToggle = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://estudiantes12.backendprueba.xyz/publicaciones/${id}`);
      window.location.replace('/');
    } catch (err) {
      console.error('Error al eliminar la publicación:', err);
    }
  };

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(`https://estudiantes12.backendprueba.xyz/comentarios/publicaciones/${id}`);
      setComentarios(response.data);
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  };

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
    const obtenerUsuarioPorId = async (usuarioid) => {
      try {
        const response = await axios.get(`https://estudiantes12.backendprueba.xyz/users/${usuarioid}`);
        setInfoUsuario(response.data);
        setImagendeperfil(response.data.imagen_perfil);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    obtenerUsuarioPorId(userId);
  }, [userId]);

  const verificarLike = async (publicacionId) => {
    try {
      const response = await axios.get(`https://estudiantes12.backendprueba.xyz/likes/publicaciones/${publicacionId}/usuario/${userId}/like`);
      setUserLiked(response.data.liked);
    } catch (error) {
      console.error('Error al verificar el like:', error);
    }
  };

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const response = await axios.get(`https://estudiantes12.backendprueba.xyz/publicaciones/${id}`);
        setPublicacion(response.data);
        setLikes(response.data.cantidad_likes);
        verificarLike(id);
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

      await axios.post(`https://estudiantes12.backendprueba.xyz/comentarios/publicaciones`, {
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
      if (!userId) {
        console.error('Usuario no autenticado');
        return;
      }

      if (userLiked) {
        await quitarLike(id);
        setLikes(likes => likes - 1);
        setUserLiked(false);
      } else {
        await darLike(id);
        setLikes(likes => likes + 1);
        setUserLiked(true);
      }
    } catch (error) {
      console.error('Error al manejar el like:', error);
      setError('Error al manejar el like. Por favor, inténtalo de nuevo.');
    }
  };

  const darLike = async () => {
    try {
      await axios.post(`https://estudiantes12.backendprueba.xyz/likes/publicaciones/${id}/like`, {
        id_usuario: userId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      throw new Error('Error al dar like: ' + error.message);
    }
  };

  const quitarLike = async (id) => {
    try {
      await axios.delete(`https://estudiantes12.backendprueba.xyz/likes/publicaciones/${id}/unlike/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                  <div className="feed_title2">
                    <div className='imagen-online'>
                      <div className={onlineUsers.includes(publicacion.usuario_publicacion?._id) ? "circleGreen" : "circleGray"}></div>
                      {publicacion.usuario_publicacion && (
                        <img src={publicacion.usuario_publicacion.imagen_perfil} alt="" />
                      )}
                      {publicacion.usuario_publicacion?.membresia === 'premium' ? (
                        <img className='verified' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png" style={{ width: "15px", height: "15px" }} alt="" />
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <span>
                      <b><Link to={`/perfil/${publicacion.usuario_publicacion?.usuario}`}>{publicacion.usuario_publicacion?.usuario}</Link></b> hizo una{" "}
                      <Link to="#">Publicacion</Link>
                      <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                    </span>
                  </div>
                  <div className="menu-container">
                    <button className="menu-button" onClick={() => handleMenuToggle(publicacion._id)}>
                      <img src={menuPubli} alt="Menu" />
                    </button>
                    {activeMenu === publicacion._id && (
                      <div className="menu-dropdown">
                        {userId !== publicacion.usuario_publicacion?._id && "admin" !== infoUsuario.rol? (
                          <button onClick={() => handleReport(publicacion._id)}>Reportar</button>
                        ) : (
                          <>
                            <button onClick={() => handleDelete(publicacion._id)}>Eliminar</button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
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
                    <li className="hover-orange selected-orange" onClick={handleLike}>
                      <i className={`fa ${userLiked ? 'fa-heart' : 'fa-heart-o'}`}></i> {likes}
                    </li>
                  </ul>
                  <ul className="feed_footer_right">
                    <div>
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
                      <div className="feedcomments-user1">
                        <div className="feedcomments-user">
                          {comentario.usuario_comentario && (
                            <>
                              <img src={comentario.usuario_comentario.imagen_perfil} alt="" />
                              <span>
                                <b>{comentario.usuario_comentario.usuario}</b>
                                <p>{new Date(comentario.fecha_creacion).toLocaleString()}</p>
                              </span>
                            </>
                          )}
                        </div>
                        <button className="menu-button">
                          <img src={menuPubli} alt="Menu" />
                        </button>
                      </div>
                      <div className="feedcomments-comment">
                        <p>{comentario.texto}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="textarea-comentarios">
                <img src={imagendeperfil} alt="Imagen de usuario" />
                <form onSubmit={handleSubmitComentario}>
                  <input
                    className='input-comentario'
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
        <NavArriba />
      </section>
    </div>
  );
}