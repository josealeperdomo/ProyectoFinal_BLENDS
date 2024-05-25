import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/General.css';
import '../styles/Feed.css';
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";

export function PublicacionPost() {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/publicaciones/${id}`);
        setPublicacion(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles de la publicación:', error);
      }
    };

    const fetchComentarios = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comentarios/publicaciones/${id}`);
        setComentarios(response.data);
      } catch (error) {
        console.error('Error al obtener los comentarios:', error);
      }
    };

    fetchPublicacion();
    fetchComentarios();
  }, [id]);

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('Usuario no autenticado');
        return;
      }

      await axios.post(`http://localhost:3000/comentarios/publicaciones`, {
        id_Publicacion: id,
        texto: comentario,
      }, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      fetchComentarios();

      setComentario('');
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      setError('Error al enviar el comentario. Por favor, inténtalo de nuevo.');
    }
  };

  if (!publicacion) {
  return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="home">
        <div className="lateral-derecha">
          <NavDer />
        </div>
        <NavArriba />
        <section className="seccion-principal">
          <div className="lateral-izquierda">
            <NavIzq />
          </div>
          <section className="central-opciones">
            <div className="seccion-general">
              <a className="row salir-post" onClick={() => window.history.back()}>
                <div className="fa fa-arrow-left"></div>
                <h3>Salir del post</h3>
              </a>
              <div className="row border-radius">
                <div className="feed">
                  <div className="feed_title">
                    <img src={publicacion.usuario_publicacion.imagen_perfil} alt="" />
                    <span>
                      <b>{publicacion.usuario_publicacion.usuario}</b> hizo una{" "}
                      <a href="#">Publicacion</a>
                      <p>{new Date(publicacion.createdAt).toLocaleString()}</p>
                    </span>
                  </div>
                  <div className="feed_content">
                    <div className="feed_content_image">
                      <p>{publicacion.texto}</p>
                    </div>
                    <div className="feed_content_image">
                      <img src={publicacion.imagen_publicacion} alt="" />
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
                          <i className="fa fa-comments-o"></i> {comentarios.length} comments
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="feedcomments">
                  <ul>
                    {comentarios.map(comentario => (
                      <li key={comentario._id}>
                        <div className="feedcomments-user">
                          <img src={comentario.usuario_comentario.imagen_perfil} alt="" />
                          <span>
                            <b>{comentario.usuario_comentario.usuario}</b>
                            <p>{new Date(comentario.fecha_creacion).toLocaleString()}</p>
                          </span>
                        </div>
                        <div className="feedcomments-comment">
                          <p>{comentario.texto}</p>
                        </div>
                        {/* Otros elementos del comentario */}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="textarea-comentarios">
                  <img src="images/user.jpg" alt="Imagen de usuario" />
                  <form onSubmit={handleSubmitComentario}>
                      <input type="text"
                      name=""
                      id=""
                      placeholder="Comentar"
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)} />
                    <button type="submit" className="fa fa-send"></button>
                  </form>
                  {error && <div className="error-message">{error}</div>}
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

