import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import { Link } from 'react-router-dom';
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

              <div className="row amigos">
              <div className="friend">
                    <div className="friend_title">
                        <img src="images/user-7.jpg" alt="" />
                        <span><b>Pedro Espinoza</b><p>4 Friends in Common</p></span>
                        <button className="add-friend">Agregar</button>
                    </div>
                    <div className="friend_title">
                        <img src="images/user-2.jpg" alt="" />
                        <span><b>Maria Martinez</b><p>2 Friends in Common</p></span>
                        <button className="add-friend">Agregar</button>
                    </div>
                    <div className="friend_title">
                        <img src="images/user-3.jpg" alt="" />
                        <span><b>Andres Pineda</b><p>1 Friends in Common</p></span>
                        <button className="add-friend">Agregar</button>
                    </div>
                    <div className="friend_title">
                        <img src="images/user-6.jpg" alt="" />
                        <span><b>Laura Hernandez</b><p>4 Friends in Common</p></span>
                        <button className="delete-friend">Eliminar</button>
                    </div>
                    <div className="friend_title">
                        <img src="images/user-4.jpg" alt="" />
                        <span><b>Tony Stevens</b><p>Mutual Friend: Sarah Hetfield</p></span>
                        <button className="delete-friend">Eliminar</button>
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

