import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png"
import openEyesImage from '../img/openeyes.png';
import closeEyesImage from '../img/closeeyes.png';
import user from '../assets/user.svg';
import mail from '../assets/mail.svg';
import password from '../assets/password.svg';
import { Link } from 'react-router-dom';
export function Register(){
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <>
         <body>
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
                            <h1>Registrate</h1>
                            <p>¿Ya tienes cuenta? <a href="/">inicia sesion</a></p>
                            <form action="">
                                <div className="img-form">
                                    <input type="email" placeholder="Usuario" />
                                    <img className='mail-password' src={user} alt="" />
                                </div>
                                <div className="img-form">
                                    <input type="email" placeholder="Email" />
                                    <img className='mail-password' src={mail} alt="" />
                                </div>

                                <div className="img-form">
                                    <input type={showPassword ? "text" : "password"} placeholder="Contraseña" />
                                    <img className='mail-password' src={password} alt="" />
                                    <img src={showPassword ? closeEyesImage : openEyesImage} alt="Mostrar contraseña" className="toggle-password" onClick={togglePasswordVisibility} />

                                </div>
                                <button>Iniciar Sesion</button>
                            </form>
                            <div className="login-centro-section2-Oc">
                                <a href="#">¿Olvidaste tu contraseña?</a>
                            </div>
                        </div>

                    </div>
                </section>
            </body>
        </>
        
    )
}