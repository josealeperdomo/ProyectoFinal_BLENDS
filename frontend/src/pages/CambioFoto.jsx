import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import camera from "../assets/camera.svg"
import fotoprede from "../img/fotopredeterminada.png"

export function CambioFoto() {
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
                        <a href={`/cambiofoto`} id="settings-select">
                          Cambiar foto de perfil
                        </a>
                      </li>
                      <li>
                        <a href={`/eliminarcuenta`} >
                          Eliminar cuenta
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="config-form">
                  <div className="row border-radius">
                    <div className='cambiarfoto-div'>
                      <img src={camera} alt="" />
                      <a href="">Subir foto</a>
                    </div>
                    <div className='fotopredeterminada'>
                      <img src={fotoprede} alt="" />
                    </div>
                    
                    
                  <button className='botonconfig' type="submit">Salvar Cambios</button>


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
