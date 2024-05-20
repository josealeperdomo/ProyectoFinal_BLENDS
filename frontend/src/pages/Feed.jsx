import "../styles/General.css";
import "../styles/Feed.css"
import NavArriba from "../components/NavArriba"; 
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
export function Feed(){
    return(
        <>
            <div className="home">
        {/*------------------------ SECCION SUPERIOR---------------*/}
        <NavArriba />

        <section className="seccion-principal">

          {/*------------------------ SECCION LATERAL IZQUIERDA-------------------*/}
          <div className="lateral-izquierda"><NavIzq /></div>
          
          {/*------------------------ SECCION CENTRO API------------------------*/}
          <section className="central-opciones">
            <div className="seccion-general">
              <div className="texto-home">
              <h1>Lorem ipsum dolor sit.</h1>
              <p className="texto-p-home">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                nesciunt veniam iure dignissimos itaque consequuntur earum odio
                perferendis cumque, accusamus maxime, iste pariatur rem quia
                provident quaerat praesentium quae. Consequuntur.
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </p>
            </div>
            </div>
          </section>
          {/*------------------------ SECCION LATERAL DERECHA---------------*/}
          <div className="lateral-derecha"> <NavDer /> </div>
          
        </section>
      </div>
        </>
    )
}
