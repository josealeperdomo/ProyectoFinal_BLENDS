import React, { useEffect, useState } from 'react';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import axios from 'axios';
import fotoejemplo from "../img/photo-1.jpg";
import { useParams } from 'react-router-dom';

export function PerfilUser() {
  const { user } = useParams(); // Obtener el valor de user de la URL
  const [perfilUsuario, setPerfilUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [amigoEnviado, setAmigoEnviado] = useState(false);

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
    const obtenerPerfilUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/user/${user}`);
        setPerfilUsuario(response.data);

        // Obtener las publicaciones del usuario
        const publicacionesResponse = await axios.get(`http://localhost:3000/publicaciones/user/${response.data._id}`);
        setPublicaciones(publicacionesResponse.data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };

    obtenerPerfilUsuario();
  }, [user]); // Asegúrate de incluir user en la lista de dependencias para que useEffect se ejecute cuando user cambie

  const handleEnviarSolicitud = async () => {
    try {
      const response = await axios.post('http://localhost:3000/amistad/enviarSolicitud', {
        id_emisor: userId,
        id_receptor: perfilUsuario._id
      });
      if (response.status === 200) {
        setAmigoEnviado(true);
        alert('Solicitud de amistad enviada correctamente');
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
                      <img src={publicacion.usuario_publicacion.imagen_perfil} alt="" />
                      <span>
                        <b>{publicacion.usuario_publicacion.usuario}</b> hizo una{" "}
                        <a href="/publicacion">Publicacion</a>
                        <p>{publicacion.fecha}</p>
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
                          <i className="fa fa-heart"></i> {}
                        </li>
                        <li>
                          <span>
                            <b>Jimmy, Andrea</b> and 47 more liked this
                          </span>
                        </li>
                      </ul>
                      <ul className="feed_footer_right">
                        <div>
                          <li className="hover-orange selected-orange">
                            <i className="fa fa-share"></i> 7k
                          </li>
                          <li className="hover-orange">
                            <i className="fa fa-comments-o"></i> {} comentarios
                          </li>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              <div className="row border-radius">
                <div className="feed">
                  <div className="feed_title">
                    <img src="images/user-6.jpg" alt="" />
                    <span>
                      <b>Valentine Krashe</b>
                      <p>March 1 at 3:53pm</p>
                    </span>
                  </div>
                  <div className="feed_content">
                    <div className="feed_content_image">
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque.
                      </p>
                    </div>
                  </div>
                  <div className="feed_footer">
                    <div className="feed_footer_left">
                      <li className="hover-orange">
                        <i className="fa fa-heart"></i> 159
                      </li>
                      <li>
                        <span>
                          <b>Jimmy, Andrea</b> and 157 more liked this
                        </span>
                      </li>
                    </div>

                    <div className="feed_footer_right">
                      <div>
                        <li className="hover-orange selected-orange">
                          <i className="fa fa-share"></i> 7k
                        </li>
                        <a href="feed.html">
                          <li className="hover-orange">
                            <i className="fa fa-comments-o"></i> 54 comments
                          </li>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row border-radius">
                <div className="feed">
                  <div className="feed_title">
                    <div>
                      <div className="feed_title ">
                        <li className="fa fa-share compartido-post"></li>
                        <span>
                          <b>Marina Valentine</b> ha compartido la{" "}
                          <a href="">Publicacion</a> de <b>Marina Valentine</b>
                        </span>
                      </div>
                      <div className="feed_title-compartido2">
                        <img src="images/user-7.jpg" alt="" />
                        <span className="feed_title-compartido">
                          <b>Marina Valentine</b>
                          <p>March 2 at 6:05pm</p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="feed_content">
                    <div className="feed_content_image">
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque.
                      </p>
                    </div>
                    <div className="feed_content_image">
                      <img src={fotoejemplo} alt="" />
                    </div>
                  </div>
                  <div className="feed_footer">
                    <ul className="feed_footer_left">
                      <li className="hover-orange selected-orange">
                        <i className="fa fa-heart"></i> 22k
                      </li>
                      <li>
                        <span>
                          <b>Jimmy, Andrea</b> and 47 more liked this
                        </span>
                      </li>
                    </ul>
                    <ul className="feed_footer_right">
                      <div>
                        <li className="hover-orange selected-orange">
                          <i className="fa fa-share"></i> 7k
                        </li>
                        <li className="hover-orange">
                          <i className="fa fa-comments-o"></i> 860 comments
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*------------------------ SECCION LATERAL DERECHA---------------*/}
        </section>
      </div>
    </>
  );
}
