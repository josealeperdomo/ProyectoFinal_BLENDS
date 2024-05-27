import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import "../styles/Feed.css";
import { Link } from "react-router-dom";
import defaultUserImage from "../img/img-user.png";

const Feed = ({ cambio }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [compartidos, setCompartidos] = useState([]);
  const [todasJuntas, setTodasJuntas] = useState([]);
  const [error, setError] = useState(null);

  const fetchPublicaciones = async () => {
    try {
      const response = await axiosInstance.get("/publicaciones/all");
      setPublicaciones(response.data);
      return response.data;
    } catch (err) {
      setError("Error al obtener las publicaciones");
    }
  };

  const fetchCompartidos = async () => {
    try {
      const response = await axiosInstance.get(
        "/compartido/publicaciones/compartidos"
      );
      setCompartidos(response.data);
      return response.data;
    } catch (err) {
      setError("Error al obtener las publicaciones compartidas");
    }
  };

  const joinsPublicaciones = () => {
    const juntas = [...publicaciones, ...compartidos];
    setTodasJuntas(juntas)
  console.log(juntas);
  };

  useEffect(( ) => {
    joinsPublicaciones();
  }, [publicaciones,compartidos])

  useEffect(() => {
    fetchPublicaciones();
    fetchCompartidos();
  }, [cambio]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Publicaciones Normales y Compartidas</h2>
      {todasJuntas &&
        todasJuntas.map((publicacion, index) => (
          <div className="row border-radius" key={index}>
            <div className="feed">
              <div className="feed_title">
                <img
                  src={
                    publicacion.usuario_publicacion
                      ? publicacion.usuario_publicacion.imagen_perfil
                      : defaultUserImage
                  }
                  alt="Imagen de usuario"
                />
                <span>
                  <b>
                    {publicacion.usuario_publicacion
                      ? publicacion.usuario_publicacion.usuario
                      : "Usuario Desconocido"}
                  </b>{" "}

                  hizo una{" "}
                  <Link to={`/publicacion/${publicacion._id}`}>
                    Publicación
                  </Link>
                  <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                </span>
              </div>
              <div className="feed_content">
                <div className="feed_content_image">
                  <p>{publicacion.texto}</p>
                </div>
                {publicacion.imagen_publicacion && (
                  <div className="feed_content_image">
                    <img
                      src={publicacion.imagen_publicacion}
                      alt="Imagen de la publicación"
                    />
                  </div>
                )}
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
        ))}
      {/* {publicaciones &&
        publicaciones.map((publicacion, index) => (
          <div className="row border-radius" key={index}>
            <div className="feed">
              <div className="feed_title">
                <img
                  src={
                    publicacion.usuario_publicacion
                      ? publicacion.usuario_publicacion.imagen_perfil
                      : defaultUserImage
                  }
                  alt="Imagen de usuario"
                />
                <span>
                  <b>
                    {publicacion.usuario_publicacion
                      ? publicacion.usuario_publicacion.usuario
                      : "Usuario Desconocido"}
                  </b>{" "}
                  hizo una{" "}
                  <Link to={`/publicacion/${publicacion._id}`}>
                    Publicación
                  </Link>
                  <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                </span>
              </div>
              <div className="feed_content">
                <div className="feed_content_image">
                  <p>{publicacion.texto}</p>
                </div>
                {publicacion.imagen_publicacion && (
                  <div className="feed_content_image">
                    <img
                      src={publicacion.imagen_publicacion}
                      alt="Imagen de la publicación"
                    />
                  </div>
                )}
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
        ))}

      <h2>Publicaciones Compartidas</h2>
      {compartidos &&
        compartidos.map((compartido, index) => (
          <div className="row border-radius" key={index}>
            <div className="feed">
              <div className="feed_title">
                <div>
                  <div className="feed_title">
                    <li className="fa fa-share compartido-post"></li>
                    <span>
                      <b>{compartido.usuario_compartio}</b> ha compartido la{" "}
                      <a href="">Publicación</a> de{" "}
                      <b>{compartido.usuario_publicacion}</b>
                    </span>
                  </div>
                  <div className="feed_title-compartido2">
                    <img src={compartido.usuario_compartio_imagen} alt="" />
                    <span className="feed_title-compartido">
                      <b>{compartido.usuario_compartio}</b>
                      <p>{compartido.fecha_compartido}</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="feed_content">
                <div className="feed_content_image">
                  <p>{compartido.texto}</p>
                </div>
                {compartido.imagen_publicacion && (
                  <div className="feed_content_image">
                    <img src={compartido.imagen_publicacion} alt="" />
                  </div>
                )}
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
        ))} */}
    </div>
  );
};

export default Feed;
