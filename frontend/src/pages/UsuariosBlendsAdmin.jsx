import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import buscar from "../assets/buscar.svg";

export function UsuariosBlendsAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, []);

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.usuario.toLowerCase().includes(busqueda.toLowerCase())
  );

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
                    <span>Administracion del admin</span>
                  </div>
                  <div className="menusetting_contain">
                    <ul>
                      <li>
                        <a href="/UsuariosBlendsAdmin" id="settings-select">
                          Usuarios de blends
                        </a>
                      </li>
                      <li>
                        <a href="/pagoMembresiaadmin">
                          Pagos de Membresia (Premium)
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="row amigos admins-space">
                <div className="buscador">
                  <img src={buscar} alt="" />
                    <input className='input-buscar-admin'
                      type="text"
                      placeholder="Buscar usuario por nombre"
                      value={busqueda}
                      onChange={handleBusquedaChange}
                    />
                  </div>

                  {usuariosFiltrados.map(usuario => (
                    <div className="friend" key={usuario._id}>
                      <div className="friend_title">
                        <img src={usuario.imagen_perfil} alt="" />
                        <span><b><a href={`/perfil/${usuario.usuario}`}>{usuario.usuario}</a></b></span>
                        <a href={`/Detailsuser/${usuario._id}`} className="add-friend">Ver detalles</a>
                      </div>
                    </div>
                  ))}
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