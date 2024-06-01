import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import { Link } from "react-router-dom";
import fotoCheck  from "../assets/check.svg";
export function PagoEnviado() {
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
              <div className="row pago_exitoso">
                <div className="fotocheck">
                  <img src={fotoCheck} alt="" />
                </div>
                <h1>Tu pago ha sido enviado a revision</h1>
                <p>Te estaremos informando cuando tu pago sea validado por correo electronico</p>
                <Link to="/home">Volver al feed</Link>


              </div>

                
            </div>
          </section>
          {/*------------------------ SECCION LATERAL DERECHA---------------*/}
        </section>
      </div>
    </>
  );
}
