import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";

export function PublicacionPost() {
  return (
    <>
      <div className="home">
        <div className="lateral-derecha">
          {" "}
          <NavDer />{" "}
        </div>
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
              <a className="row salir-post" href="javascript:history.back()" >
                  <div className="fa fa-arrow-left ">  
                  </div>
                  <h3>Salir del post</h3>
              </a>
          
                
              <div className="row border-radius">
                
                <div className="feed">
                  <div className="feed_title">
                    <img src="images/user-7.jpg" alt="" />
                    <span>
                      <b>Marina Valentine</b> hizo una{" "}
                      <a href="">Publicacion</a>
                      <p>March 2 at 6:05pm</p>
                    </span>
                  </div>
                  <div className="feed_content">
                    <div className="feed_content_image">
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque.
                      </p>
                    </div>
                    <div className="feed_content_image">
                      <img src={fotoejemplo} alt="" />
                    </div>
                  </div>
                  <div className="feed_footer">
                    <ul className="feed_footer_left">
                      <li className="hover-orange selected-orange">
                        <i className="fa fa-heart"></i> 22k
                      </li>
                      <li>
                        <span>
                          <b>Jimmy, Andrea</b> and 47 more liked this
                        </span>
                      </li>
                    </ul>
                    <ul className="feed_footer_right">
                      <div>
                        <li className="hover-orange selected-orange">
                          <i className="fa fa-share"></i> 7k
                        </li>
                        <li className="hover-orange">
                          <i className="fa fa-comments-o"></i> 860 comments
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>

                <div className="feedcomments">
                  <ul>
                    <li>
                      <div className="feedcomments-user">
                        <img src="images/user-6.jpg" />
                        <span>
                          <b>Mathilda Brinker</b>
                          <p>38 mins ago</p>
                        </span>
                      </div>
                      <div className="feedcomments-comment">
                        <p>
                          Ratione voluptatem sequi en lod nesciunt. Neque porro
                          quisquam est, quinder dolorem ipsum quia dolor sit
                          amet, consectetur adipisci velit en lorem ipsum duis
                          aute irure dolor in reprehenderit in voluptate velit
                          esse cillum.
                        </p>
                      </div>
                      <div className="feedcomments-foot">
                        <i className="fa fa-heart"></i>
                        <span>3 likes</span>
                        <p>
                          <a href="#">
                            <i className="fa fa-reply"></i> reply
                          </a>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="feedcomments-user">
                        <img src="images/user.jpg" />
                        <span>
                          <b>Jonh Hamstrong</b>
                          <p>1 hour ago</p>
                        </span>
                      </div>
                      <div className="feedcomments-comment">
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium der doloremque laudantium.
                        </p>
                      </div>
                      <div className="feedcomments-foot">
                        <i className="fa fa-heart"></i>
                        <span>44 likes</span>
                        <p>
                          <a href="#">
                            <i className="fa fa-reply"></i> reply
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="textarea-comentarios">
                    <img src="images/user.jpg" />
                    <textarea name="" id="" placeholder="Comentar"> </textarea>
                    <p className="fa fa-send"></p>
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
