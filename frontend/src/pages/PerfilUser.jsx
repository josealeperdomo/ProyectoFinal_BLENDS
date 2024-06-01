import React, { useEffect, useState } from 'react';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

export function PerfilUser() {
  const { user } = useParams(); // Obtener el valor de user de la URL
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [amigoEnviado, setAmigoEnviado] = useState(false);
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [infoUsuario, setInfoUsuario] = useState(null);

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
    if (!userId) return;

    const obtenerUsuarioPorId = async (usuarioid) => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${usuarioid}`);
        setInfoUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    obtenerUsuarioPorId(userId);
  }, [userId]);

  useEffect(() => {
    const obtenerPerfilUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/user/${user}`);
        setPerfilUsuario(response.data);

        const publicacionesResponse = await axios.get(`http://localhost:3000/publicaciones/user/${response.data._id}`);
        setPublicaciones(publicacionesResponse.data);
        
        const likesData = {};
        const userLikesData = {};
        publicacionesResponse.data.forEach(publicacion => {
            likesData[publicacion._id] = publicacion.cantidad_likes || 0;
            userLikesData[publicacion._id] = false;
        });
        setLikes(likesData);
        setUserLikes(userLikesData);

        publicacionesResponse.data.forEach(publicacion => {
            verificarLike(publicacion._id);
        });

        // Obtenemos los likes cada vez que se monta el componente
        await obtenerLikes(publicacionesResponse.data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };
    obtenerPerfilUsuario();
  }, [user]); // Asegúrate de incluir user en la lista de dependencias para que useEffect se ejecute cuando user cambie

  useEffect(() => {
    const fetchPublicaciones = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/publicaciones/user/${perfilUsuario._id}`);
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
      setPublicaciones(
        publicaciones.filter((publicacion) => publicacion._id !== id)
      );
    } catch (err) {
      console.error("Error al eliminar la publicación:", err);
    }
  };

  const handleEnviarSolicitud = async () => {
    try {
      const response = await axios.post('http://localhost:3000/amistad/enviarSolicitud', {
        id_emisor: userId,
        id_receptor: perfilUsuario._id
      });
      if (response.status === 200) {
        setAmigoEnviado(true);
        Swal.fire({
          title: "Solicitud enviada!",
          text: "La solicitud ha sido enviada al usuario",
          icon: "success"
        });    
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de amistad:', error);
      alert(error.response?.data?.message || 'Error al enviar la solicitud de amistad');
    }
  };

  return (
    <>
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
              <div className="row">
                <div className="profile-datos">
                  <img src={perfilUsuario?.imagen_perfil} alt="" />
                  {perfilUsuario?.membresia === 'premium' ? <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png" style={{width: "15px", height: "15px" }} alt="" /> : <div></div>}
                  <h3>{perfilUsuario?.usuario}</h3>
                  <p>{perfilUsuario?.biografia}</p>
                </div>
                <div className="profile-stats">
                  <div className="profile-stat-amigos">
                    <h3>{perfilUsuario?.amigos.length}</h3>
                    <p>Amigos</p>
                  </div>
                  <div className="profile-stat-Publicaciones">
                    <h3>{publicaciones.length}</h3>
                    <p>Publicaciones</p>
                  </div>
                </div>
                <div className="profile-buttons">
                  {userId !== perfilUsuario?._id && !amigoEnviado && (
                    <button onClick={handleEnviarSolicitud}>
                      <p className="fa fa-plus"></p>Agregar a amigos
                    </button>
                  )}
                </div>
              </div>
              
              {/* Renderizar las publicaciones */}
              {publicaciones.map((publicacion) => (
                <div className="row border-radius" key={publicacion._id}>
                    <div className="feed">
                        <div className="feed_title">
                            <div className="feed_title2">
                              <img src={publicacion.usuario_publicacion.imagen_perfil} alt="" />
                              <span>
                                <b><a href={`/perfil/${publicacion.usuario_publicacion.usuario}`}>{publicacion.usuario_publicacion.usuario}</a></b> hizo una <a href={`/publicacion/${publicacion._id}`}>Publicacion</a>
                                <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                            </span>
                            </div>
                            {(infoUsuario?.rol === 'admin' || userId === publicacion.usuario_publicacion._id) && (
                              <div className="feed_menu">
                                <button onClick={() => handleMenuToggle(publicacion._id)}>
                                  <i className="fa fa-ellipsis-v"></i>
                                </button>
                                {activeMenu === publicacion._id && (
                                  <div className="feed_menu_dropdown">
                                    <button onClick={() => handleDelete(publicacion._id)}>
                                      Eliminar
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                        </div>
                        <div className="feed_content">
                            <div className="feed_content_text feed_content_image">
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
            </div>
          </section>
          {/*------------------------ SECCION LATERAL DERECHA---------------*/}
        </section>
      </div>
    </>
  );
}