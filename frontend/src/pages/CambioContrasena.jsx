import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import { Link } from "react-router-dom";
export function CambioContrasena() {
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
                        <a href="/configuracion">
                          Informacion Personal
                        </a>
                      </li>
                      <li>
                        <a href="/cambiocontrasena" id="settings-select">
                          Cambio de contraseña
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="config-form">
                <div class="row border-radius">
                <center><div class="settings shadow">
                    <div class="settings_title">
                        <h3>Cambio de contraseña</h3>
                    </div>
                    <div class="settings_content">
                        <form>
                            <div class="pi-input pi-input-lgg">
                                <span>Anterior contraseña</span>
                                <input type="password" value="SocialNetwork" />
                            </div>
                            <div class="pi-input pi-input-lg">
                                <span>Nueva contraseña</span>
                                <input type="password" placeholder="Nueva contraseña aqui.." />
                            </div>
                            <div class="pi-input pi-input-lg">
                                <span>Confirma contraseña</span>
                                <input type="password" placeholder="Nueva contraseña aqui.." />
                            </div>
                            

                            <button>Cambiar contraseña</button>
                        </form>
                    </div>
                </div></center>
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
