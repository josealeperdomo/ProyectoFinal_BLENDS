import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import { Link } from "react-router-dom";
export function ConfigUser() {
  return (
    <>
      <div className="home">
        {/*------------------------ SECCION SUPERIOR---------------*/}
        <NavArriba />

        <section className="seccion-principal">
          {/*------------------------ SECCION LATERAL IZQUIERDA-------------------*/}
          <div className="lateral-izquierda">
            <NavIzq />
          </div>

          {/*------------------------ SECCION CENTRO API------------------------*/}
          <section className="central-opciones">
            <div className="seccion-general">
              <div className="row amigos ">
                <div className="row shadow config-menu">
                  <div className="row_title">
                    <span>Configuracion de perfil</span>
                  </div>
                  <div className="menusetting_contain">
                    <ul>
                      <li>
                        <a href="/configuracion" id="settings-select">
                          Informacion Personal
                        </a>
                      </li>
                      <li>
                        <a href="/cambiocontrasena" >
                          Cambio de contraseña
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="config-form">
                  <div className="row border-radius">
                    <center>
                      <div className="settings shadow">
                        <div className="settings_title">
                          <h3>informacion Personal </h3>
                        </div>
                        <div className="settings_content">
                          <form>
                            <div className="pi-input pi-input-lg">
                              <span>Nombre</span>
                              <input type="text" value="Jonh" />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Apellido</span>
                              <input type="text" value="Hamstrong" />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Correo electonico</span>
                              <input type="text" value="Jonh@yourmail.com" />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Nombre de usuario</span>
                              <input type="text" value="Jhon" />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Descripcion sobre ti</span>
                              <input type="text" value="Hola! Soy nuevo en Blends" />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Imagen de perfil</span>
                              <input type="text" />
                            </div>

                            <button>Salvar Cambios</button>
                          </form>
                        </div>
                      </div>
                    </center>
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
