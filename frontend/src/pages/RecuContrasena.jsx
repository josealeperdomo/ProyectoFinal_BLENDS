import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png";
import mail from '../assets/mail.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

        // Verificar si el correo existe en la base de datos
        axios.post('http://localhost:3000/users/verificarCorreo', { email })
            .then(function (response) {
                if (response.data.exists) {
                    setAlerta("Se ha enviado un enlace para restablecer la contraseña a tu correo.");
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
