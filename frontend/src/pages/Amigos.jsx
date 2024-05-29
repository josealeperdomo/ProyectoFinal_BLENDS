import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";

export function Amigos() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Usuario no autenticado');
    return;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const id = decodedToken.id;  
  const [amigos, setAmigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerAmigos = async () => {
      try {
        // Realizar una solicitud al servidor para obtener los amigos del usuario utilizando el ID
        const response = await axios.get(`http://localhost:3000/users/amigos/${id}`);
        if (Array.isArray(response.data)) {
          setAmigos(response.data);
        } else {
          setAmigos([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la lista de amigos:', error);
        setError('Error al cargar la lista de amigos');
        setLoading(false);
      }
    };

    obtenerAmigos();
  }, [id]);

  const handleEliminarAmigo = async (idAmigo) => {
    try {
      // Realizar una solicitud DELETE al servidor para eliminar el amigo
      await axios.patch('http://localhost:3000/amistad/eliminarAmigo', {
    
          id_emisor: id,
          id_receptor: idAmigo
        
      });

      // Actualizar la lista de amigos eliminando al amigo eliminado
      setAmigos(prevAmigos => prevAmigos.filter(amigo => amigo._id !== idAmigo));
    } catch (error) {
      console.error('Error al eliminar el amigo:', error);
      // Manejar el error, como mostrar un mensaje al usuario
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
              {amigos.length === 0 ? (
                <div>No tienes amigos.</div>
              ) : (
                <div className="row amigos">
                  {amigos.map(amigo => (
                    <div className="friend" key={amigo._id}>
                      <div className="friend_title">
                        <img src={amigo.imagen_perfil} alt={amigo.usuario} />
                        <span><b><a href={`/perfil/${amigo.usuario}`}>{amigo.usuario}</a></b></span>
                        <button className="delete-friend" onClick={() => handleEliminarAmigo(amigo._id)}>Eliminar</button>
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