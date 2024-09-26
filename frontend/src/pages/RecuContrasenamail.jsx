import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import clave from '../assets/password.svg';
import Swal from 'sweetalert2'

export function RecuContrasenamail() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alerta, setAlerta] = useState("");
    const {codigo} = useParams()

    const verificarCodigo = () => {
        axios.post('https://estudiantes12.backendprueba.xyz/recuperarPassword/verificarCodigo', { codigo })
            .then(function (response) {
                if (response.data.exists) {
                    console.log(response.data);
                } else {
                    window.location.replace("/ingresarcodigo")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    verificarCodigo()

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

        axios.patch(`https://estudiantes12.backendprueba.xyz/recuperarPassword/nuevaContrasena/${codigo}`, {nuevaContrasena: password, nuevaContrasena2: confirmPassword})
        .then(function (response) {
            if (response) {
                Swal.fire({
                    title: "Contraseña actualizada exitosamente",
                    text: "Su contraseña ha sido actualizada",
                    icon: "success",
                    didClose: ()=>{
                        window.location.replace("/")
                    }
                  });
            } else {
                setAlerta("error al cambiar contrasena")
            }
        })
        .catch(function (error) {
            console.log(error);
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
