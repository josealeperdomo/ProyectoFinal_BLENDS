import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import Swal from 'sweetalert2';

export function Usuarios() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Usuario no autenticado');
    return;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const id = decodedToken.id;
  const user = useParams()
  console.log(user);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        console.log(`http://localhost:3000/users/search?query=${user.busqueda}`);
        const response = await axios.get(`http://localhost:3000/users/users/search?query=${user.busqueda}`);
        if (Array.isArray(response.data)) {
          setUsuarios(response.data);
        } else {
          setUsuarios([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        setError('Error al cargar la lista de usuarios');
        setLoading(false);
      }
    };
  
    obtenerUsuarios();
  }, [user.busqueda]);

  const handleEnviarSolicitud = async (idReceptor) => {
    if (idReceptor === id) return alert("No puedes enviarte una solicitud a ti mismo");
    try {
        const response = await axios.post('http://localhost:3000/amistad/enviarSolicitud', {
            id_emisor: id,
            id_receptor: idReceptor
        });
        if (response.status === 200) {
            Swal.fire({
                title: "Solicitud de amistad enviada exitosamente",
                text: "Su solicitud ha sido enviada",
                icon: "success"
              });    
        }
    } catch (error) {
        console.error('Error al enviar la solicitud de amistad:', error);
        Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || 'Error al enviar la solicitud de amistad',
            icon: "error"
          });
    }
};

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="home">

        {/* SECCION SUPERIOR */}
        <NavArriba />


        <section className="seccion-principal">
          {/* SECCION LATERAL IZQUIERDA */}
          <div className="lateral-izquierda">
            <NavIzq />
          </div>

          {/* SECCION CENTRO API */}
          <section className="central-opciones">
            <div className="seccion-general">
                <h1>Los resultados para {user.busqueda} son:</h1>
              {usuarios.length === 0 ? (
                <div>No hay usuarios que coincidan con su busqueda.</div>
              ) : (
                <div className="row amigos">
                  {usuarios.map(usuario => (
                    <div className="friend" key={usuario._id}>
                    
                      <div className="friend_title">
                        <div className='imagen-online'>
                          <img src={usuario.imagen_perfil} alt={usuario.usuario} />
                          {usuario.membresia == 'premium' ? <img className='verified' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/800px-Twitter_Verified_Badge.svg.png" style={{width: "15px", height: "15px" }} alt="" /> : <div></div>}
                        </div>
                        
                        <span><b><Link to={`/perfil/${usuario.usuario}`}>{usuario.usuario}</Link></b></span>
                        <button className="delete-friend" onClick={() => handleEnviarSolicitud(usuario._id)}>Agregar amigo</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
          {/* SECCION LATERAL DERECHA */}
        </section>
      </div>
    </>
  );
}