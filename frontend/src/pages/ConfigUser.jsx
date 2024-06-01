import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import Swal from 'sweetalert2'

export function ConfigUser() {
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    email: '',
    usuario: '',
    biografia: ''
  });
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Usuario no autenticado');
    return;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const id_usuario = decodedToken.id;
  const navigate = useNavigate()

  useEffect(() => {
    const obtenerIdUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id_usuario}`);
        const userFound = response.data

        if (userFound) {
          setUserId(userFound._id);
          setUser(userFound);
        } else {
          console.error('Usuario no encontrado');
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    obtenerIdUsuario();
  }, [id_usuario]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await axios.put(`http://localhost:3000/users/${userId}`, user);
        Swal.fire({
          title: "Usuario actualizado correctamente",
          text: "Sus datos han sido actualizados",
          icon: "success"
        });      
      } else {
        console.error('ID de usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
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
                <div className="row shadow config-menu">
                  <div className="row_title">
                    <span>Configuracion de perfil</span>
                  </div>
                  <div className="menusetting_contain">
                    <ul>
                      <li>
                        <Link to={`/configuracion`} id="settings-select">
                          Informacion Personal
                        </Link>
                      </li>
                      <li>
                        <Link to={`/cambiocontrasena`}>
                          Cambio de contraseña
                        </Link>
                      </li>
                      <li>
                        <Link to={`/cambiofoto`}>
                          Cambiar foto de perfil
                        </Link>
                      </li>
                      <li>
                        <Link to={`/eliminarcuenta`} >
                          Eliminar cuenta
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="config-form">
                  <div className="row border-radius">
                    <center>
                      <div className="settings shadow">
                        <div className="settings_title">
                          <h3>Informacion Personal</h3>
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
                              <span>Correo electrónico</span>
                              <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                                placeholder="Correo electrónico"
                              />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Nombre de usuario</span>
                              <input
                                type="text"
                                name="usuario"
                                value={user.usuario}
                                onChange={handleInputChange}
                                placeholder="Nombre de usuario"
                              />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Descripción sobre ti</span>
                              <input
                                type="text"
                                name="biografia"
                                value={user.biografia}
                                onChange={handleInputChange}
                                placeholder="Descripción sobre ti"
                              />
                            </div>
                            <button type="submit">Salvar Cambios</button>
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
