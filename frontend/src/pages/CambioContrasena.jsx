import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:3000/users/${id_usuario}/contrasena`, {
        anteriorContrasena,
        nuevaContrasena
      });
      if (response.status === 200) {
        alert('Contraseña cambiada exitosamente');
        setAnteriorContrasena('');
        setNuevaContrasena('');
        setConfirmarContrasena('');
      } else {
        alert('Hubo un problema al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
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
                        <a href={`/configuracion`}>
                          Información Personal
                        </a>
                      </li>
                      <li>
                        <a href={`/cambiocontrasena`} id="settings-select">
                          Cambio de contraseña
                        </a>
                      </li>
                      <li>
                        <a href={`/cambiofoto`}>
                          Cambiar foto de perfil
                        </a>
                      </li>
                      <li>
                        <a href={`/eliminarcuenta`}>
                          Eliminar cuenta
                        </a>
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
