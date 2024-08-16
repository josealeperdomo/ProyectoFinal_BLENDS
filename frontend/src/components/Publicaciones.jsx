import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Feed.css";
import { useSocketContext } from "../routes/SocketContext";
import menuPubli from "../assets/menucopubli.svg";
import { Link } from "react-router-dom";

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const { onlineUsers } = useSocketContext();
  const [infoUsuario, setInfoUsuario] = useState(null);

  const getTokenPayload = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson);
    } catch (error) {
      console.error("Error parsing token payload:", error);
      return null;
    }
  };

  const payload = getTokenPayload();
  const userId = payload ? payload.id : null;

  useEffect(() => {
    if (!userId) return;

    const obtenerUsuarioPorId = async (usuarioid) => {
      try {
        const response = await axios.get(`http://sa.backendprueba.xyz:3001/users/${usuarioid}`);
        setInfoUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    obtenerUsuarioPorId(userId);
  }, [userId]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://sa.backendprueba.xyz:3001/publicaciones/all");
        setPublicaciones(response.data);

        const likesData = {};
        const userLikesData = {};
        for (const publicacion of response.data) {
          likesData[publicacion._id] = publicacion.cantidad_likes || 0;
          userLikesData[publicacion._id] = false;
        }
        setLikes(likesData);
        setUserLikes(userLikesData);

        for (const publicacion of response.data) {
          verificarLike(publicacion._id);
        }
      } catch (err) {
        setError("Error al obtener las publicaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  const verificarLike = async (publicacionId) => {
    try {
      const response = await axios.get(
        `http://sa.backendprueba.xyz:3001/likes/publicaciones/${publicacionId}/usuario/${userId}/like`
      );
      setUserLikes((prevUserLikes) => ({
        ...prevUserLikes,
        [publicacionId]: response.data.liked,
      }));
    } catch (error) {
      console.error("Error al verificar el like:", error);
    }
  };

  const handleLike = async (publicacionId) => {
    try {
      const response = await axios.post(
        `http://sa.backendprueba.xyz:3001/likes/publicaciones/${publicacionId}/like`,
        {
          id_usuario: userId,
        }
      );
      setLikes((prevLikes) => ({
        ...prevLikes,
        [publicacionId]: response.data.cantidad_likes,
      }));
      setUserLikes((prevUserLikes) => ({
        ...prevUserLikes,
        [publicacionId]: true,
      }));
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const handleUnlike = async (publicacionId) => {
    try {
      const response = await axios.delete(
        `http://sa.backendprueba.xyz:3001/likes/publicaciones/${publicacionId}/unlike/${userId}`
      );
      setLikes((prevLikes) => ({
        ...prevLikes,
        [publicacionId]: response.data.cantidad_likes,
      }));
      setUserLikes((prevUserLikes) => ({
        ...prevUserLikes,
        [publicacionId]: false,
      }));
    } catch (error) {
      console.error("Error al quitar like:", error);
    }
  };

  const handleMenuToggle = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://sa.backendprueba.xyz:3001/publicaciones/${id}`);
      setPublicaciones(
        publicaciones.filter((publicacion) => publicacion._id !== id)
      );
    } catch (err) {
      console.error("Error al eliminar la publicación:", err);
    }
  };

  const handleEdit = (id) => {
    console.log("Editar publicación:", id);
  };

  const handleReport = (id) => {
    console.log("Reportar publicación:", id);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {publicaciones.length > 0 ? (
        publicaciones.map((publicacion) => {
          const usuario = publicacion.usuario_publicacion;
          return (
            <div className="row border-radius" key={publicacion._id}>
              <div className="feed">
                <div className="feed_title">
                  <div className="feed_title2">
                    <div className="imagen-online">
                      <div
                        className={
                          onlineUsers.includes(usuario?._id)
                            ? "circleGreen"
                            : "circleGray"
                        }
                      ></div>
                      {usuario && (
                        <>
                          <img src={usuario.imagen_perfil} alt="" />
                          {usuario.membresia === "premium" ? (
                            <img
                              className="verified"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png"
                              style={{ width: "15px", height: "15px" }}
                              alt=""
                            />
                          ) : null}
                        </>
                      )}
                    </div>
                    <span>
                      <b>
                        <Link to={`/perfil/${usuario?.usuario}`}>
                          {usuario?.usuario}
                        </Link>
                      </b>{" "}
                      hizo una{" "}
                      <Link to={`/publicacion/${publicacion._id}`}>Publicacion</Link>
                      <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                    </span>
                  </div>
                  <div className="menu-container">
                    <button
                      className="menu-button"
                      onClick={() => handleMenuToggle(publicacion._id)}
                    >
                      <img src={menuPubli} alt="Menu" />
                    </button>
                    {activeMenu === publicacion._id && (
                      <div className="menu-dropdown">
                        {userId !== usuario?._id && infoUsuario?.rol !== "admin" ? (
                          <button onClick={() => handleReport(publicacion._id)}>
                            Reportar
                          </button>
                        ) : (
                          <>
                            <button onClick={() => handleDelete(publicacion._id)}>
                              Eliminar
                            </button>
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
                    <li
                      className="hover-orange selected-orange"
                      onClick={() =>
                        userLikes[publicacion._id]
                          ? handleUnlike(publicacion._id)
                          : handleLike(publicacion._id)
                      }
                    >
                      <i
                        className={`fa ${
                          userLikes[publicacion._id] ? "fa-heart" : "fa-heart-o"
                        }`}
                      ></i>{" "}
                      {likes[publicacion._id]}
                    </li>
                    <li></li>
                  </ul>
                  <ul className="feed_footer_right">
                    <div>
                      <li className="hover-orange">
                        <i className="fa fa-comments-o"></i> comments
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        !loading && <div>No hay publicaciones disponibles</div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Publicaciones;
