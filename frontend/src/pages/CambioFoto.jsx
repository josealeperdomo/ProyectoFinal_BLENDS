import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import camera from "../assets/camera.svg";
import Swal from 'sweetalert2'


export function CambioFoto() {
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    email: '',
    usuario: '',
    biografia: '',
    imagen_perfil: ''
  });
  const [userId, setUserId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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
        const response = await axios.get(`http://localhost:3000/users/${id_usuario}`);
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

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error('No se ha seleccionado ninguna imagen');
      return;
    }

    const formData = new FormData();
    formData.append('imagen_perfil', selectedFile);

    try {
      const response = await axios.put(`http://localhost:3000/users/cambiarimagen/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setUser((prevUser) => ({
        ...prevUser,
        imagen_perfil: response.data.user.imagen_perfil
      }));

      Swal.fire({
        title: "Imagen cambiada con exito!",
        text: "Su imagen de perfil ha sido actualizada",
        icon: "success"
      });      
      navigate(`/perfil/${user.usuario}`);
    } catch (error) {
      console.error('Error al cambiar la imagen de perfil:', error);
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
                    <form onSubmit={handleSubmit}>
                      <div className='cambiarfoto-div'>
                        <label htmlFor="file-input">
                          <img src={camera} alt="Camera icon" />
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <a href="">Subir foto</a>
                      </div>
                      <div className='fotopredeterminada'>
                        <img src={user.imagen_perfil} alt="Foto predeterminada" />
                      </div>
                      <button className='botonconfig' type="submit">Salvar Cambios</button>
                    </form>
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