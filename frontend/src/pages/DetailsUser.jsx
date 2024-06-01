import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import Swal from 'sweetalert2'


export function DetailsUser() {
  const navigate = useNavigate()
  const { id } = useParams(); // Obtiene el id de los parámetros de la ruta
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    };

    obtenerUsuario();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${id}`, user);
      Swal.fire({
        title: "Usuario actualizado correctamente",
        text: "Los datos del usuario han sido actualizados",
        icon: "success"
      });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      Swal.fire({
        title: "Usuario eliminado correctamente",
        text: "El usuario ha sido eliminado",
        icon: "success"
      });    
      navigate('/UsuariosBlendsAdmin')
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

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
                <a className="row salir-post" href="javascript:history.back()">
                  <div className="fa fa-arrow-left ">
                  </div>
                  <h3>Ir a Usuarios</h3>
                </a>

                <div className="config-form">
                  <div className="row border-radius">
                    <center>
                      <div className="settings shadow">
                        <div className="settings_title">
                          <h3>Datos del usuario</h3>
                        </div>
                        <div className="settings_content">
                          <form onSubmit={handleSubmit}>
                            <div className="pi-input pi-input-lg">
                              <span>Nombre</span>
                              <input
                                type="text"
                                name="nombre"
                                value={user.nombre}
                                onChange={handleInputChange}
                                placeholder="Nombre"
                              />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Apellido</span>
                              <input
                                type="text"
                                name="apellido"
                                value={user.apellido}
                                onChange={handleInputChange}
                                placeholder="Apellido"
                              />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Correo</span>
                              <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                                placeholder="Correo"
                              />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Contraseña</span>
                              <input
                                type="password"
                                name="password"
                                onChange={handleInputChange}
                                placeholder="Contraseña"
                              />
                            </div>
                            <div className="buton-details">
                              <button type="submit" className="userdetailBoton">Guardar cambios</button>
                              <button type="button" onClick={handleDelete} className="userdetailBotonred">Eliminar cuenta</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </center>
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