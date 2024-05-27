import React, { useState } from "react";
import axios from "axios";
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import NavIzq from "../components/NavIzq";
import NavDer from "../components/NavDer";

export function PagoPremium() {
  const [metodoPago, setMetodoPago] = useState('Pago Movil');
  const [numeroRef, setNumeroRef] = useState('');
  const [fechaPago, setFechaPago] = useState('');
  const [banco, setBanco] = useState('Banco de venezuela');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const token = localStorage.getItem('token');
      if (!token) {
        console.error('Usuario no autenticado');
        return;
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const id_usuario = decodedToken.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario = id_usuario; 
      const monto = 50; 

      const response = await axios.post('http://localhost:3000/pagos/insertar', {
        usuario,
        monto,
        fecha_pago: fechaPago,
        banco,
        descripcion,
        metodo_pago: metodoPago
      });

      if (response.status === 201) {
        setMensaje('Pago registrado exitosamente.');
      } else {
        setMensaje('Error al registrar el pago.');
      }
    } catch (error) {
      console.error('Error al enviar el pago:', error);
      setMensaje('Error al enviar el pago. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="home">
      <NavArriba />
      <section className="seccion-principal">
        <div className="lateral-izquierda">
          <NavIzq />
        </div>
        <section className="central-opciones">
          <div className="seccion-general">
            <div className="row">
              <div className="row border-radius">
                <center>
                  <div className="settings shadow">
                    <div className="settings_title">
                      <h3>Datos de tu pago</h3>
                    </div>
                    <div className="settings_content">
                      <form onSubmit={handleSubmit}>
                        <div className="pi-input pi-input-lg">
                          <span>Metodo de pago</span>
                          <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                          <option value="" disabled>Selecciona el método de pago</option>
                            <option value="pagomovil">Pago Movil</option>
                            <option value="transferencia">Transferencia</option>
                          </select>
                        </div>
                        <div className="pi-input pi-input-lg">
                          <span>Numero de ref</span>
                          <input
                            type="text"
                            value={numeroRef}
                            onChange={(e) => setNumeroRef(e.target.value)}
                          />
                        </div>
                        <div className="pi-input pi-input-lg">
                          <span>Fecha del pago</span>
                          <input
                            type="date"
                            value={fechaPago}
                            onChange={(e) => setFechaPago(e.target.value)}
                          />
                        </div>
                        <div className="pi-input pi-input-lg">
                          <span>Banco</span>
                          <select value={banco} onChange={(e) => setBanco(e.target.value)}>
                          <option value="" disabled selected=''>Selecciona el banco al que hiciste el pago</option>
                            <option value="Mercantil">Mercantil</option>
                            <option value="Bancamiga">Bancamiga</option>
                            <option value="Banesco">Banesco</option>
                          </select>
                        </div>
                        <div className="pi-input pi-input-lg">
                          <span>Descripcion del pago</span>
                          <input
                            type="text"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                          />
                        </div>
                        <button type="submit">Informar sobre mi pago</button>
                        <p>Su pago será aceptado en 24 horas</p>
                        {mensaje && <p>{mensaje}</p>}
                      </form>
                    </div>
                  </div>
                </center>
              </div>
              <b><h3>Datos para el pago</h3></b>
              <div className="datos-pago">
                <div>
                  <p><b>Transferencia:</b></p>
                  <p>n de cta: 015525654686856956</p>
                  <p>Banco: Mercantil</p>
                  <p>CI: 24854564654</p>
                  <p>Monto: 50$ al BCV</p>
                </div>
                <div>
                  <p><b>Pagomovil:</b></p>
                  <p>Banco: Mercantil, Bancamiga, Banesco</p>
                  <p>CI: 24854564654</p>
                  <p>tlf: 0417701578</p>
                  <p>Monto: 50$ al BCV</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}