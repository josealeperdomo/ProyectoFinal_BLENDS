import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import { Link } from "react-router-dom";
export function PagoPremium() {
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
              <div className="row ">

                <div class="row border-radius">
                  <center>
                    <div class="settings shadow">
                      <div class="settings_title">
                        <h3>Personal Information</h3>
                      </div>
                      <div class="settings_content">
                        <form>
                          <div class="pi-input pi-input-lg">
                            <span>Metodo de pago</span>
                            <select>
                              <option selected>Pago Movil</option>
                              <option>Transferencia</option>
                            </select>
                          </div>

                          <div class="pi-input pi-input-lg">
                            <span>Numero de ref</span>
                            <input type="text" />
                          </div>
                          <div class="pi-input pi-input-lg">
                            <span>Fecha del pago</span>
                            <input type="date" value="today" />
                          </div>

                          <div class="pi-input pi-input-lg">
                            <span>Banco</span>
                            <select>
                              <option selected>Banco de venezuela</option>
                              <option>Mercantil</option>
                              <option>Bancamiga</option>
                              <option>Banesco</option>
                            </select>
                          </div>

                          <div class="pi-input pi-input-lgg">
                            <span>Descripcion del pago</span>
                            <input
                              type="text"
                            
                            />
                          </div>

                          <button>Informar sobre mi pago</button>
                          <p>Su pago será aceptado en 24 horas</p>
                        </form>
                      </div>
                    </div>
                  </center>
                </div>
                <b><h3>Datos para el pago</h3></b>
                  <div className="datos-pago">
                    
                    <div>
                  
                    <p><b>Transferencia:</b></p>
                    <p>n de cta: 015525654686856956</p>
                    <p>Banco: Mercantil</p>
                    <p>CI: 24854564654</p>


                    </div>
                    <div>

                    <p><b>Pagomovil:</b></p>
                    <p>n de cta: 015525654686856956</p>
                    <p>Banco: Mercantil, bancamiga, banesco</p>
                    <p>CI: 24854564654</p>
                    <p>tlf: 0417701578</p>

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
