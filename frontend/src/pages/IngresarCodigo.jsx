import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png";
import mail from '../assets/mail.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function IngresarCodigo() {
    const [codigo, setCodigo] = useState("");
    const [alerta, setAlerta] = useState("");

    const verificarCodigo = (e) => {
        e.preventDefault();
        setAlerta("");

        if (!codigo) {
            setAlerta("El campo de correo electrónico es requerido");
            return;
        }
        
        axios.post('https://estudiantes12.backendprueba.xyz/recuperarPassword/verificarCodigo', { codigo })
            .then(function (response) {
                if (response.data.exists) {
                    window.location.replace(`/recuperacontrasena/${codigo}`)                
                } else {
                    setAlerta("Codigo invalido");
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
                        <p>Ingresa el codigo que se ha enviado ha tu correo</p>
                        <form onSubmit={verificarCodigo}>
                            <div className="img-form">
                                <input 
                                    type="text" 
                                    placeholder="Codigo" 
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)} 
                                />
                                
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
