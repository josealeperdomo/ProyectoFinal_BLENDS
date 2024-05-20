import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png"
import persona from "../img/personasimg.png"
import openEyesImage from '../img/openeyes.png';
import closeEyesImage from '../img/closeeyes.png';
import mail from '../assets/mail.svg';
import password from '../assets/password.svg';
import { Link } from 'react-router-dom';


export function Login(){
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
                        <Link to="/register">
                            <button className="login_superior_button1">Registrate</button>
                        </Link>
                            <button className="login_superior_button2">Premium</button>
                        </div>
                    </div>
                    <div className="login-centro">
                        <div className="login-centro-section2">
                            <h1>Inicio de sesión</h1>
                            <p>¿Eres nuevo? <a href="/register">Crea tu cuenta</a></p>
                            <form action="">
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

                        <div className="login-centro-section1">
                            <h2>Bienvenidos a Blends, Tu red social</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem doloribus tempora ipsam voluptates asperiores laudantium reiciendis fugit adipisci, molestias, labore at unde consequatur magnam dicta, voluptatum soluta eius odio illo.</p>
                            <div className="login-centro-section1-div">
                                <img className="login-centro-section1-img" src={persona} alt="" />
                                <p>1k+ Personas se han unido a Blends, ahora es tu turno</p>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        </>
    )
}
