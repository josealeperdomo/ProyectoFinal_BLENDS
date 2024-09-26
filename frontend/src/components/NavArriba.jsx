import React, { useState, useEffect } from "react";
import "../styles/General.css";
import "../styles/Components.css";
import Logo from "../img/LogoBlends.png";
import Amigos from "../assets/usuario.svg";
import mensaje from "../assets/mensaje.svg";
import notificacion from "../assets/notificacion.svg";
import user from "../img/img-user.png";
import arrow from "../assets/arrow.svg";
import buscar from "../assets/buscar.svg";
import menu from "../assets/menu.svg";
import like from "../assets/like.svg";
import share from "../assets/share.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function NavArriba() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Usuario no autenticado");
    return;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const id_usuario = decodedToken.id;
  const [user, setUser] = useState({
    usuario: "",
  });

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(
          `https://estudiantes12.backendprueba.xyz/users/${id_usuario}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del usuario:", error);
      }
    };

    obtenerUsuario();
  }, [id_usuario]);

  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [isVisibleNotificaciones, setIsVisibleNotificaciones] = useState(false);
  const [isVisibleAmigos, setIsVisibleAmigos] = useState(false);
  const [isVisibleMensajes, setIsVisibleMensajes] = useState(false);
  const [isVisibleUsuario, setIsVisibleUsuario] = useState(false);
  const [isVisibleBuscador, setIsVisibleBuscador] = useState(false);

  const toggleDropdown = (setState, state) => {
    if (state) {
      setState(false); // Cerramos el menú si ya está abierto
    } else {
      // Cerramos todos los demás menús
      setIsVisibleMenu(false);
      setIsVisibleNotificaciones(false);
      setIsVisibleAmigos(false);
      setIsVisibleMensajes(false);
      setIsVisibleBuscador(false);
      setIsVisibleUsuario(false);
      setState(true); // Abrimos el menú
    }
  };

  const navigate = useNavigate()
  const cerrarSesion = () => {
    // Eliminar token
    localStorage.removeItem("token");
    // Redirigir a la página de inicio de sesión
    navigate('/');
  };

  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        const response = await axios.get(
          `https://estudiantes12.backendprueba.xyz/amistad/${id_usuario}`
        );
        setSolicitudes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
        setError("Error al cargar las solicitudes");
        setLoading(false);
      }
    };

    obtenerSolicitudes();
  }, [solicitudes]);

  const rechazarSolicitud = async (id_emisor, id_receptor) => {
    try {
      const response = await axios.delete(
        "https://estudiantes12.backendprueba.xyz/amistad/rechazarSolicitud",
        { id_emisor, id_receptor }
      );
      console.log(response.data.message);
      setSolicitudes([])
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
    }
  };

  const aceptarSolicitud = async (id_emisor, id_receptor) => {
    try {
      const response = await axios.patch(
        "https://estudiantes12.backendprueba.xyz/amistad/aceptarSolicitud",
        { id_emisor, id_receptor }
      );
      console.log(response.data.message);
      setSolicitudes([])
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
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
const [infoUsuario, setInfoUsuario] = useState(null);
const [amigos, setAmigos] = useState([]);
const [cantidadAmigos, setCantidadAmigos] = useState([]);
const [busqueda, setBusqueda] = useState('')



useEffect(() => {
    const obtenerUsuarioPorId = async (usuarioid) => {
        try {
            const response = await axios.get(`https://estudiantes12.backendprueba.xyz/users/${usuarioid}`);
            setInfoUsuario(response.data);
            const amigosData = response.data.amigos;
            if (Array.isArray(amigosData)) {
                setAmigos(amigosData);
                setCantidadAmigos(amigosData.length);
            } else {
                setAmigos([]);
                console.log('No hay amigos');
            }
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
        }
    };

    obtenerUsuarioPorId(userId);
}, [userId]);

  const handleSearch = (e)=>{
    e.preventDefault()
    if(busqueda != ""){
      navigate(`/usuarios/${busqueda}`)
    }else{
      Swal.fire({
        title: "Error!",
        text: "La busqueda no puede estar vacia",
        icon: "error"
      });    
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <>
      <section className="superior shadow">
        <img className="img-logo" src={Logo} alt="" />
        <div className="superior-input">
          <form onSubmit={handleSearch}>
          <input
            className="superior-input-buscar"
            type="text"
            placeholder="Buscar en Blends"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <img src={buscar} alt="" />
          </form>
        </div>
        <div className="superior-buttons">
          <div
            className="superior-button-hamburgueza"
            onClick={() => toggleDropdown(setIsVisibleMenu, isVisibleMenu)}
          >
            <img className="menu-hamburger" src={menu} alt="" />
          </div>
          <div
            className={
              isVisibleMenu ? "dropdown-content show" : "dropdown-content"
            }
          >
            <div className="left_row menuhamburguer">
              <div className="left_row">
                <div className="left_row_profile">
                  <div className="left_row_profile">
                    <img id="profile_pic" src={infoUsuario?.imagen_perfil} />
                    <span>
                      {infoUsuario?.usuario}
                      <p>{cantidadAmigos} amigo(s)</p>
                    </span>
                  </div>
                </div>
                <div className="rowmenu">
                  <div className="rowmenu-ul">
                    <li>
                      <Link to="/home">
                        <i className="fa fa-globe"></i>Nuevas publicaciones
                      </Link>
                    </li>
                    <li>
                      <Link to={`/perfil/${infoUsuario?.usuario}`}>
                        <i className="fa fa-user"></i>Mi perfil
                      </Link>
                    </li>
                    <li>
                      <Link to="/amigos">
                        <i className="fa fa-users"></i>Mis amigos
                      </Link>
                    </li>
                    <li>
                      <Link to="/chats">
                        <i className="fa fa-comments-o"></i>Mis chats
                      </Link>
                    </li>
                    <li>
                      <Link to="/PagoPremium">
                        <i className="fa fa-money"></i>Comprar premiun
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="superior-button superior-input-movil"
            onClick={() =>
              toggleDropdown(setIsVisibleBuscador, isVisibleBuscador)
            }
          >
            <img src={buscar} alt="Buscador" />
            <div
              className={
                isVisibleBuscador ? "dropdown-content show" : "dropdown-content"
              }
            >
              Div desplegable 2
            </div>
          </div>
          <div
            className="superior-button"
            onClick={() => toggleDropdown(setIsVisibleAmigos, isVisibleAmigos)}
          >
            <img src={Amigos} alt="Amigos" />
            {solicitudes.length > 0 ? (
              <div className="superior-button-number">{solicitudes.length}</div>) : null
            }
          </div>

          <div
            className={
              isVisibleAmigos ? "dropdown-content show" : "dropdown-content"
            }
          >
            <div className="modal modal-friends">
              <div className="modal-icon-select">
                <i className="fa fa-sort-asc" aria-hidden="true"></i>
              </div>
              <div className="modal-title">
                <span>FRIEND REQUESTS</span>
                <Link to="/amigos">
                  <i className="fa fa-ellipsis-h"></i>
                </Link>
              </div>
              <div className="modal-content">
                <ul>
                  {solicitudes.length === 0 && solicitudes.usuarioEmisor ? (
                    <ul>
                      <li>No tienes solicitudes</li>
                    </ul>
                  ) : (
                    solicitudes.map((solicitud) => (
                      <li key={solicitud._id}>
                        <Link to="/amigos">
                          <img
                            src={solicitud.usuarioEmisor.imagen_perfil}
                            alt={solicitud.nombre}
                          />
                          <div className="modal-content-info">
                            <span>
                              <b>{solicitud.usuarioEmisor?.usuario}</b>
                            </span>
                          </div>
                          <button
                            className="modal-content-accept"
                            onClick={() =>
                              aceptarSolicitud(
                                solicitud.usuarioEmisor._id,
                                solicitud.usuarioReceptor
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="modal-content-decline"
                            onClick={() =>
                              rechazarSolicitud(
                                solicitud.usuarioEmisor._id,
                                solicitud.usuarioReceptor
                              )
                            }
                          >
                            Decline
                          </button>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="superior-button"
          > <Link to="/chats">
            <img src={mensaje} alt="Mensajes" />
            </Link>
          </div>

          <div
            className="superior-buttons-user"
            onClick={() =>
              toggleDropdown(setIsVisibleUsuario, isVisibleUsuario)
            }
          >
            <div className="superior-button">
              <img
                className="img-user"
                src={user.imagen_perfil}
                alt="Tu usuario"
              />
              <img className="img-arrow" src={arrow} alt="" />
            </div>
          </div>
          <div
            className={
              isVisibleUsuario ? "dropdown-content show" : "dropdown-content"
            }
          >
            <div className="modal modal-profile">
              <div className="modal-icon-select">
                <i className="fa fa-sort-asc" aria-hidden="true"></i>
              </div>
              <div className="modal-title">
                <span>YOUR ACCOUNT</span>
                <Link to="/configuracion">
                  <i className="fa fa-cogs"></i>
                </Link>
              </div>
              <div className="modal-content">
                <ul>
                  <li>
                    <Link to={`/configuracion`}>
                      <i className="fa fa-tasks" aria-hidden="true"></i>
                      <div className="modal-content-info">
                        <span>
                          <b>Configuracion de Usuario</b>
                        </span>
                        <span>Yours profile settings</span>
                      </div>
                    </Link>
                  </li>
                  {user.rol === 'admin' ? (<li>
                    <Link to="/UsuariosBlendsAdmin">
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                      <div className="modal-content-info">
                        <span>
                          <b>Administracion Admin</b>
                        </span>
                        <span>sitio para admins</span>
                      </div>
                    </Link>
                  </li>) : <div></div>}
                  <li>
                    <a href="#" onClick={cerrarSesion}>
                      <i className="fa fa-power-off" aria-hidden="true"></i>
                      <div className="modal-content-info">
                        <span>
                          <b>Cerrar sesión</b>
                        </span>
                        <span>Cierra tu sesión</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NavArriba;
