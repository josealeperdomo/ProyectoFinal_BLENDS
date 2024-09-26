import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import Swal from 'sweetalert2'


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
  const navigate = useNavigate();

  if (!token) {
    console.error('Usuario no autenticado');
    return null;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const id_usuario = decodedToken.id;

  useEffect(() => {
    const obtenerIdUsuario = async () => {
      try {
        const response = await axios.get(`https://estudiantes12.backendprueba.xyz/users/${id_usuario}`);
        const userFound = response.data;

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

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`https://estudiantes12.backendprueba.xyz/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      Swal.fire({
        title: "Cuenta eliminada exitosamente",
        text: "Su cuenta ha sido eliminada",
        icon: "success",
        didClose: () => {
          navigate('/');
      }
      });    
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      Swal.fire({
        title: "Error!",
        text: "Hubo un error al eliminar la cuenta",
        icon: "error"
      });    }
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
                        <Link to={`/configuracion`} >
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
                        <Link to={`/eliminarcuenta`} id="settings-select">
                          Eliminar cuenta
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="config-form">
                  <div className="row border-radius">
                    <h1 className='eliminarcuenta'>¿Estás seguro de eliminar tu cuenta?</h1>
                    <button className='botonconfig botonconfig-red' onClick={handleDeleteAccount}>
                      Eliminar Cuenta
                    </button>
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
