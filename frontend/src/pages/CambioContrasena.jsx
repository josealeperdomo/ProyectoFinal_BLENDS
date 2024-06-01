import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

export function CambioContrasena() {
  const [anteriorContrasena, setAnteriorContrasena] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const token = localStorage.getItem('token');
      if (!token) {
        console.error('Usuario no autenticado');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const id_usuario = decodedToken.id;

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (nuevaContrasena !== confirmarContrasena) {
      Swal.fire({
        title: "Contraseñas distintas",
        text: "Las contraseñas no coinciden",
        icon: "error"
      });
      return;
    }
    try {
      const response = await axios.put(`http://localhost:3000/users/${id_usuario}/contrasena`, {
        anteriorContrasena,
        nuevaContrasena
      });
      if (response.status === 200) {
        console.log("hola");
        Swal.fire({
          title: "Contraseña cambiada exitosamente!",
          text: "Su contraseña ha sido modificada",
          icon: "success"
        });
        setAnteriorContrasena('');
        setNuevaContrasena('');
        setConfirmarContrasena('');
      } else {
        Swal.fire({
          title: "Error!",
          text: "Hubo un error al cambiar la contraseña",
          icon: "error"
        });
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Swal.fire({
        title: "Error!",
        text: "Hubo un error al cambiar la contraseña, Verifica que este poniendo tu anterior contraseña correctamente",
        icon: "error"
      });
    }
  };

  return (
    <>
      <div className="home">
        <NavArriba />

        <section className="seccion-principal">
          <div className="lateral-izquierda">
            <NavIzq />
          </div>

          <section className="central-opciones">
            <div className="seccion-general">
              <div className="row amigos ">
                <div className="row shadow config-menu">
                  <div className="row_title">
                    <span>Configuración de perfil</span>
                  </div>
                  <div className="menusetting_contain">
                    <ul>
                      <li>
                        <Link to={`/configuracion`}>
                          Información Personal
                        </Link>
                      </li>
                      <li>
                        <Link to={`/cambiocontrasena`} id="settings-select">
                          Cambio de contraseña
                        </Link>
                      </li>
                      <li>
                        <Link to={`/cambiofoto`}>
                          Cambiar foto de perfil
                        </Link>
                      </li>
                      <li>
                        <Link to={`/eliminarcuenta`}>
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
                          <h3>Cambio de contraseña</h3>
                        </div>
                        <div className="settings_content">
                          <form onSubmit={handleSubmitPassword}>
                            <div className="pi-input pi-input-lgg">
                              <span>Anterior contraseña</span>
                              <input
                                type="password"
                                value={anteriorContrasena}
                                onChange={(e) => setAnteriorContrasena(e.target.value)}
                                required
                              />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Nueva contraseña</span>
                              <input
                                type="password"
                                value={nuevaContrasena}
                                onChange={(e) => setNuevaContrasena(e.target.value)}
                                placeholder="Nueva contraseña aquí..."
                                required
                              />
                            </div>
                            <div className="pi-input pi-input-lg">
                              <span>Confirmar contraseña</span>
                              <input
                                type="password"
                                value={confirmarContrasena}
                                onChange={(e) => setConfirmarContrasena(e.target.value)}
                                placeholder="Confirmar la nueva contraseña aquí..."
                                required
                              />
                            </div>
                            <button type="submit">Cambiar contraseña</button>
                          </form>
                        </div>
                      </div>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
