import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png";
import mail from '../assets/mail.svg';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export function RecuContrasena() {
    const [email, setEmail] = useState("");
    const [alerta, setAlerta] = useState("");

    const verificarCorreo = (e) => {
        e.preventDefault();
        setAlerta("");

        if (!email) {
            setAlerta("El campo de correo electrónico es requerido");
            return;
        }

        const regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regemail.test(email)) {
            setAlerta("El correo electrónico no tiene un formato válido.");
            return;
        }

        axios.post('https://estudiantes12.backendprueba.xyz/recuperarPassword/verificarCorreo', { email })
            .then(function (response) {
                if (response.data.exists) {
                    Swal.fire({
                        title: "Codigo enviado",
                        text: "El codigo ha sido enviado a su correo electronico",
                        icon: "success",
                        didClose: () => {
                            window.location.replace("/ingresarcodigo")                     
                        }
                      });    
                                      
                } else {
                    setAlerta("Este correo no ha sido registrado antes");
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.data && error.response.data.Message) {
                    setAlerta(error.response.data.Message);
                } else {
                    setAlerta("Error al enviar la solicitud");
                }
            });
    }

    return (
        <>
            <section>
                <div className="login_superior">
                    <img className="login_logo" src={Logo} alt="Blends" />
                    <div className="login_superior_buttons">
                        <Link to="/">
                            <button className="login_superior_button1">Inicia Sesion</button>
                        </Link>
                        <button className="login_superior_button2">Premium</button>
                    </div>
                </div>
                <div className="login-centro">
                    <div className="login-centro-section2">
                        <h1>Recupera tu contraseña</h1>
                        <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
                        <form onSubmit={verificarCorreo}>
                            <div className="img-form">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                                <img className='mail-password' src={mail} alt="Mail Icon" />
                            </div>
                            <p className='alerta'>{alerta}</p>
                            <button type="submit">Recuperar</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
