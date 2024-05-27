import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import { Link } from "react-router-dom";
export function DetailsUser() {
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
              <a className="row salir-post" href="javascript:history.back()" >
                  <div className="fa fa-arrow-left ">  
                  </div>
                  <h3>Ir a Usuarios</h3>
              </a>
                
              <div className="config-form">
                <div class="row border-radius">
                <center><div class="settings shadow">
                    <div class="settings_title">
                        <h3>Datos del usuario</h3>
                    </div>
                    <div class="settings_content">
                        <form>
                            <div class="pi-input pi-input-lg">
                                <span>Nombre</span>
                                <input type="text" value="Nombre" />
                            </div>
                            <div class="pi-input pi-input-lg">
                                <span>Apellido</span>
                                <input type="text" value="Apellido" />
                            </div>
                            <div class="pi-input pi-input-lg">
                                <span>Correo</span>
                                <input type="password" placeholder="Correo" />
                            </div>
                            <div class="pi-input pi-input-lg">
                                <span>Contraseña</span>
                                <input type="password" placeholder="Contraseña" />
                            </div>
                            <div className="buton-details">
                              
                              <button className="userdetailBoton">Guardar cambios</button>
                              <button className="userdetailBotonred">Eliminar cuenta</button>

                            </div>
                            

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
