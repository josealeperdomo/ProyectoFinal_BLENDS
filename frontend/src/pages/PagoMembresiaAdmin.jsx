import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import { Link } from "react-router-dom";
export function PagoMembresiaAdmin() {
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
                        <a href="/UsuariosBlendsAdmin">Usuarios de blends</a>
                      </li>
                      <li>
                        <a href="/PagoMembresiaAdmin" id="settings-select">
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
                      <span>
                        <b>Pedro Espinoza</b>
                      </span>
                      <button className="add-friend">Agregar</button>
                      <button className="add-friend userdetailBotonred2">Rechazar</button>
                    </div>
                    <div className="datos_pago">
                      <p><b>Metodo:</b>Pagomovil</p>
                      <p><b>Monto:</b>15$</p>
                      <p><b>Banco:</b>Mercantil</p>
                      <p><b>Fecha:</b>31/05/2024</p>
                      <p><b>Numero de ref:</b>0155254766255</p>
                      
                    </div>
                  </div>





                  <div className="friend">
                    <div className="friend_title">
                      <img src="images/user-7.jpg" alt="" />
                      <span>
                        <b>Pedro Espinoza</b>
                      </span>
                      <button className="add-friend">Agregar</button>
                      <button className="add-friend userdetailBotonred2">Rechazar</button>
                    </div>
                    <div className="datos_pago">
                      <p><b>Metodo:</b>Pagomovil</p>
                      <p><b>Monto:</b>15$</p>
                      <p><b>Banco:</b>Mercantil</p>
                      <p><b>Fecha:</b>31/05/2024</p>
                      <p><b>Numero de ref:</b>0155254766255</p>
                      
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
