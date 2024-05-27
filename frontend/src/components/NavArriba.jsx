import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

function NavArriba() {
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


  const cerrarSesion = () => {
    // Eliminar token
    localStorage.removeItem("token");
    // Redirigir a la página de inicio de sesión
    window.location.href = "/";
};

  return (
    <>
      <section className="superior shadow">
        <img className="img-logo" src={Logo} alt="" />
        <div className="superior-input">
          <input
            className="superior-input-buscar"
            type="text"
            placeholder="Buscar en Blends"
          />
          <img src={buscar} alt="" />
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
                    <img id="profile_pic" src="images/user.jpg" />
                    <span>
                      Jonh Hamstrong<p>150k followers / 50 follow</p>
                    </span>
                  </div>
                </div>
                <div className="rowmenu">
                  <div className="rowmenu-ul">
                    <li>
                      <a href="/home">
                        <i className="fa fa-globe"></i>Nuevas publicaciones
                      </a>
                    </li>
                    <li>
                      <a href="/perfil">
                        <i className="fa fa-user"></i>Mi perfil
                      </a>
                    </li>
                    <li>
                      <a href="/amigos">
                        <i className="fa fa-users"></i>Mis amigos
                      </a>
                    </li>
                    <li>
                      <a href="index.html">
                        <i className="fa fa-comments-o"></i>Mis chats
                      </a>
                    </li>
                    <li>
                      <a href="index.html">
                        <i className="fa fa-money"></i>Comprar premiun
                      </a>
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
            <div className="superior-button-number">5</div>
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
                <a href="friends.html">
                  <i className="fa fa-ellipsis-h"></i>
                </a>
              </div>
              <div className="modal-content">
                <ul>
                  <li>
                    <a href="#">
                      <img src="images/user-2.jpg" alt="" />
                      <div className="modal-content-info">
                        <span>
                          <b>Tony Stevens</b>
                        </span>
                        <span>4 Friends in Common</span>
                      </div>

                      <button className="modal-content-accept">Accept</button>
                      <button className="modal-content-decline">Decline</button>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/user-6.jpg" alt="" />
                      <div className="modal-content-info">
                        <span>
                          <b>Tamara Romanoff</b>
                        </span>
                        <span>4 Friends in Common</span>
                      </div>
                      <button className="modal-content-accept">Accept</button>
                      <button className="modal-content-decline">Decline</button>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/user-4.jpg" alt="" />
                      <div className="modal-content-info">
                        <span>
                          <b>Nicholas Grissom</b>
                        </span>
                        <span>4 Friends in Common</span>
                      </div>
                      <button className="modal-content-accept">Accept</button>
                      <button className="modal-content-decline">Decline</button>
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <img src="images/user-4.jpg" alt="" />
                      <div className="modal-content-info">
                        <span>
                          <b>Nicholas Grissom</b>
                        </span>
                        <span>4 Friends in Common</span>
                      </div>
                      <button className="modal-content-accept">Accept</button>
                      <button className="modal-content-decline">Decline</button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="superior-button"
            onClick={() =>
              toggleDropdown(setIsVisibleMensajes, isVisibleMensajes)
            }
          >
            <img src={mensaje} alt="Mensajes" />
            <div className="superior-button-number">5</div>
          </div>

          <div
            className={
              isVisibleMensajes ? "dropdown-content show" : "dropdown-content"
            }
          >
            <div className="modal modal-comments">
              <div className="modal-icon-select">
                <i className="fa fa-sort-asc" aria-hidden="true"></i>
              </div>
              <div className="modal-title">
                <span>CHAT / MESSAGES</span>
                <a href="messages.html">
                  <i className="fa fa-ellipsis-h"></i>
                </a>
              </div>
              <div className="modal-content">
                <ul>
                  <li>
                    <a href="#">
                      <img src="images/user-7.jpg" alt="" />
                      <div className="modal-content-info-message">
                        <span>
                          <b>Diana Jameson</b>
                        </span>
                        <span>
                          Hi James! It’s Diana, I just wanted to let you know
                          that we have to reschedule...
                        </span>
                        <span>
                          <p>4 hours ago</p>
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/user-6.jpg" alt="" />
                      <div className="modal-content-info-message">
                        <span>
                          <b>Elaine Dreyfuss</b>
                        </span>
                        <span>
                          We’ll have to check that at the office and see if the
                          client is on board with...
                        </span>
                        <span>
                          <p>Yesterday at 9:56pm</p>
                        </span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/user-3.jpg" alt="" />
                      <div className="modal-content-info-message">
                        <span>
                          <b>Elaine Dreyfuss</b>
                        </span>
                        <span>
                          We’ll have to check that at the office and see if the
                          client is on board with...
                        </span>
                        <span>
                          <p>Yesterday at 9:56pm</p>
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="superior-button"
            onClick={() =>
              toggleDropdown(
                setIsVisibleNotificaciones,
                isVisibleNotificaciones
              )
            }
          >
            <img src={notificacion} alt="Notificaciones" />
          </div>

          <div
            className={
              isVisibleNotificaciones
                ? "dropdown-content show"
                : "dropdown-content"
            }
          >
            <div className="modal modal-comments">
              <div className="modal-icon-select">
                <i className="fa fa-sort-asc" aria-hidden="true"></i>
              </div>
              <div className="modal-title">
                <span>NOTIFICACIONES</span>
                <a href="messages.html">
                  <i className="fa fa-ellipsis-h"></i>
                </a>
              </div>
              <div className="modal-content">
                <ul>
                  <li>
                    <a href="#">
                      <img src="images/user-7.jpg" alt="" />
                      <div className="modal-content-info-message">
                        <span>
                          <b>Diana Jameson</b>
                        </span>
                        <span>
                          <p>Ha dado like a tu foto de perfil</p>
                        </span>
                        <span>4 hours ago</span>
                      </div>

                      <img className="img-notoficaciones" src={like} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/user-6.jpg" alt="" />
                      <div className="modal-content-info-message">
                        <span>
                          <b>Diana Jameson</b>
                        </span>
                        <span>
                          <p>Le gusto tu publicacion</p>
                        </span>
                        <span>4 hours ago</span>
                      </div>
                      <img className="img-notoficaciones" src={like} alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="images/user-3.jpg" alt="" />
                      <div className="modal-content-info-message">
                        <span>
                          <b>Diana Jameson</b>
                        </span>
                        <span>
                          <p>Compartio tu publicacion</p>
                        </span>
                        <span>4 hours ago</span>
                      </div>
                      <img className="img-notoficaciones" src={share} alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="superior-buttons-user"
            onClick={() =>
              toggleDropdown(setIsVisibleUsuario, isVisibleUsuario)
            }
          >
            <div className="superior-button">
              <img className="img-user" src={user} alt="Tu usuario" />
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
                <a href="settings.html">
                  <i className="fa fa-cogs"></i>
                </a>
              </div>
              <div className="modal-content">
                <ul>
                  <li>
                    <a href="/configuracion">
                      <i className="fa fa-tasks" aria-hidden="true"></i>
                      <div className="modal-content-info">
                        <span>
                          <b>Configuracion de Usuario</b>
                        </span>
                        <span>Yours profile settings</span>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="/UsuariosBlendsAdmin">
                      <i className="fa fa-star-o" aria-hidden="true"></i>
                      <div className="modal-content-info">
                        <span>
                          <b>Administracion Admin</b>
                        </span>
                        <span>sitio para admins</span>
                      </div>
                    </a>
                  </li>
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
