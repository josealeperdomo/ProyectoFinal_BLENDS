import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";

export function EliminarCuenta() {
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
        alert('Usuario actualizado correctamente');
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
                        <a href={`/configuracion`} >
                          Informacion Personal
                        </a>
                      </li>
                      <li>
                        <a href={`/cambiocontrasena`}>
                          Cambio de contraseña
                        </a>
                      </li>
                      <li>
                        <a href={`/cambiofoto`}>
                          Cambiar foto de perfil
                        </a>
                      </li>
                      <li>
                        <a href={`/eliminarcuenta`} id="settings-select">
                          Eliminar cuenta
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="config-form">
                  <div className="row border-radius">
                    <h1 className='eliminarcuenta'>¿Estás seguro de eliminar tu cuenta?</h1>
                    
                    
                  <button className=' botonconfig botonconfig-red' type="submit">Eliminar Cuenta</button>


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
