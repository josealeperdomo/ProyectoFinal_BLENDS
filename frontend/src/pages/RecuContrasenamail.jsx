import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png";
import axios from 'axios';
import { Link } from 'react-router-dom';
import clave from '../assets/password.svg';

export function RecuContrasenamail() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alerta, setAlerta] = useState("");

    const restablecerContrasena = (e) => {
        e.preventDefault();
        setAlerta("");

        if (!password || !confirmPassword) {
            setAlerta("Ambos campos de contraseña son requeridos");
            return;
        }

        if (password !== confirmPassword) {
            setAlerta("Las contraseñas no coinciden");
            return;
        }

        const regpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!regpassword.test(password)) {
            setAlerta("La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.");
            return;
        }

        // Obtener el token de la URL o del estado de la aplicación
        const token = ""; // Debes obtener el token de alguna manera

        // Enviar la nueva contraseña al servidor
        axios.post('http://localhost:3000/users/restablecerContrasena', { token, password })
            .then(function (response) {
                setAlerta("Tu contraseña ha sido restaurada");
            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.data && error.response.data.Message) {
                    setAlerta(error.response.data.Message);
                } else {
                    setAlerta("Error al restablecer la contraseña");
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
                        <p>Ingresa tu nueva contraseña y confírmala.</p>
                        <form onSubmit={restablecerContrasena}>
                            <div className="img-form">
                                <img className='mail-password' src={clave} alt="" />
                                <input 
                                    type="password" 
                                    placeholder="Nueva contraseña" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                            <div className="img-form">
                                <img className='mail-password' src={clave} alt="" />
                                <input 
                                    type="password" 
                                    placeholder="Confirmar nueva contraseña" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                />
                            </div>
                            <p className='alerta'>{alerta}</p>
                            <button type="submit">Restablecer</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
