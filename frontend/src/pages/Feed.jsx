import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";
import fotoejemplo from "../img/photo-1.jpg";
import Publicaciones from "../components/Publicaciones";
import axios, { Axios } from "axios";
import { useState, useEffect } from "react";

export function Feed(){

    const token = localStorage.getItem('token');
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const [texto, setTexto] = useState('');
    const [imagen, setImagen] = useState(null);
    const [userId, setUserId] = useState(payload.id);
    const [infoUsuario, setInfoUsuario] = useState(null);

    useEffect(() => {
        const obtenerUsuarioPorId = async (usuarioid) => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${usuarioid}`);
                setInfoUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        obtenerUsuarioPorId(userId);
    }, [userId]);

    const publicar = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('texto', texto);
        formData.append('imagen_publicacion', imagen);
        formData.append('usuario_publicacion', userId);

        try {
            await axios.post('http://localhost:3000/publicaciones', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
                
            });
            setTexto("")
            setImagen(null)
            document.getElementById('textoinput').value = ""
            location.reload();
        } catch (error) {
            console.error('Error al publicar:', error);
        }
    };

    return(
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
              <div className="row">
                <div className="publish">
                  <div className="row_title">
                    <span>
                      <i className="fa fa-newspaper-o" aria-hidden="true"></i>{" "}
                      Status
                    </span>
                  </div>
                  <form method="" action="/">
                    <div className="publish_textarea">
                      <img
                        className="border-radius-image"
                        src="images/user.jpg"
                        alt=""
                      />
                      <textarea
                        type="text"
                        placeholder="¿Whats up, Jonh?"
                      ></textarea>
                    </div>


                    <form method="" onSubmit={publicar}>
                        <div className="publish_textarea">
                            <img className="border-radius-image" src={infoUsuario?.imagen_perfil} alt="" />
                            <input  type="text" style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', lineHeight: '1.5', border: '1px solid #ccc', borderRadius: '5px', resize: 'vertical', overflow: 'auto' }} id="textoinput" placeholder={`¿Whats up, ${infoUsuario?.usuario}?`} onChange={(e) => {setTexto(e.target.value)
                                console.log(texto)
                            }}/>
                        </div>
                        <div className="publish_icons">
                            <ul>
                            <li>
                                <label htmlFor="fileInput">
                                    <i className="fa fa-camera"></i>
                                </label>
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImagen(e.target.files[0])}
                                    style={{ display: 'none' }} 
                                />
                            </li>
                                <li><i className="fa fa-video-camera"></i></li>
                                <li><i className="fa fa-map-marker" aria-hidden="true"></i></li>
                            </ul>
                            <button>Publish</button>
                        </div>
                    </form>
                </div>
              </div>

                
            </div>

            
            <Publicaciones/>

            <div className="row border-radius">
                <div className="feed">
                  <div className="feed_title">
                    <img src="images/user-6.jpg" alt="" />
                    <span>
                      <b>Valentine Krashe</b>
                      <p>March 1 at 3:53pm</p>
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
                  </div>
                  <div className="feed_footer">
                    <div className="feed_footer_left">
                      <li className="hover-orange selected-orange">
                        <i className="fa fa-heart"></i> 159
                      </li>
                      <li>
                        <span>
                          <b>Jimmy, Andrea</b> and 157 more liked this
                        </span>
                      </li>
                    </div>

                    <div className="feed_footer_right">
                      <div>
                        <li className="hover-orange selected-orange">
                          <i className="fa fa-share"></i> 7k
                        </li>
                        <a href="feed.html">
                          <li className="hover-orange">
                            <i className="fa fa-comments-o"></i> 54 comments
                          </li>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row border-radius">
                <div className="feed">
                  <div className="feed_title">
                    <div>
                      <div className="feed_title ">
                        <li className="fa fa-share compartido-post"></li>
                        <span>
                          <b>Marina Valentine</b> ha compartido la{" "}
                          <a href="">Publicacion</a> de <b>Marina Valentine</b>
                        </span>
                      </div>
                      <div className="feed_title-compartido2">
                        <img src="images/user-7.jpg" alt="" />
                        <span className="feed_title-compartido">
                          <b>Marina Valentine</b>
                          <p>March 2 at 6:05pm</p>
                        </span>
                      </div>
                    </div>
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
              </div>
            </div>
          </section>
          {/*------------------------ SECCION LATERAL DERECHA---------------*/}
        </section>
      </div>
    </>
  );
}
