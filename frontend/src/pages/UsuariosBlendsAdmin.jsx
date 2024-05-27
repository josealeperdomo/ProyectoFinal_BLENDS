import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import { Link } from "react-router-dom";
export function UsuariosBlendsAdmin() {
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
                    <span>Administracion del admin</span>
                  </div>
                  <div className="menusetting_contain">
                    <ul>
                      <li>
                        <a href="/UsuariosBlendsAdmin" id="settings-select">
                          Usuarios de blends
                        </a>
                      </li>
                      <li>
                        <a href="/pagoMembresiaadmin" >
                          Pagos de Membresia (Premium)
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" row amigos admins-space">
              <div className="friend">
                    <div className="friend_title">
                        <img src="images/user-7.jpg" alt="" />
                        <span><b>Pedro Espinoza</b></span>
                        <a href="/Detailsuser" className="add-friend" >Ver detalles</a>

                    </div>
                    



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
