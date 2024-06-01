import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import { Link } from 'react-router-dom';

export function PagoMembresiaAdmin() {
  const [pagos, setPagos] = useState([]);

  const obtenerPagos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pagos');
      const pagosPendientes = response.data.filter(pago => pago.estado_pago === 'pendiente');
      setPagos(pagosPendientes);
    } catch (error) {
      console.error('Error al obtener los pagos:', error);
    }
  };

  useEffect(() => {
    obtenerPagos();
  }, []);

  const aceptarPago = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/pagos/pagos/${id}/aceptar`);
      obtenerPagos();
    } catch (error) {
      console.error('Error al aceptar el pago:', error);
    }
  };

  const rechazarPago = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/pagos/pagos/${id}/rechazar`);
      obtenerPagos();
    } catch (error) {
      console.error('Error al rechazar el pago:', error);
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
                    <span>Administracion del admin</span>
                  </div>
                  <div className="menusetting_contain">
                    <ul>
                      <li>
                        <Link to="/UsuariosBlendsAdmin">Usuarios de blends</Link>
                      </li>
                      <li>
                        <Link to="/PagoMembresiaAdmin" id="settings-select">
                          Pagos de Membresia (Premium)
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" row amigos admins-space">
                  {pagos.map(pago => (
                    <div className="friend" key={pago._id}>
                      <div className="friend_title">
                        <img src={pago.usuario.imagen_perfil} alt="" />
                        <span><b>{pago.usuario.usuario}</b></span>
                        <button className="add-friend" onClick={() => aceptarPago(pago._id)}>Aceptar</button>
                        <button className="add-friend userdetailBotonred2" onClick={() => rechazarPago(pago._id)}>Rechazar</button>
                      </div>
                      <div className="datos_pago">
                        <p><b>Método:</b> {pago.metodo_pago}</p>
                        <p><b>Monto:</b> {pago.monto}</p>
                        <p><b>Banco:</b> {pago.banco}</p>
                        <p><b>Fecha:</b> {pago.fecha_pago}</p>
                        <p><b>Número de ref:</b> {pago.numero_ref}</p>
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