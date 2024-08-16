import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png"
import persona from "../img/personasimg.png"
import openEyesImage from '../img/openeyes.png';
import closeEyesImage from '../img/closeeyes.png';
import mail from '../assets/mail.svg';
import clave from '../assets/password.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState("");
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const logearse = (e) => {
        e.preventDefault();
        setAlerta("");

        if (!email || !password) {
            setAlerta("Todos los campos deben estar llenos");
            return;
        }

        axios.post('http://sa.backendprueba.xyz:3001/login', {
            email,
            password
        })
        .then(function (response) {
            console.log(response);
            const { data } = response;
            if (data && data.token) {
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                setAlerta("Correo o contraseña invalido");
            }
        })
        .catch(function (error) {
            console.log(error);
            setAlerta("Correo o contraseña invalido");
        });
    }

    return (
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
                    <p>¿Eres nuevo? <Link to="/register">Crea tu cuenta</Link></p>
                    <form onSubmit={logearse}>
                        <div className="img-form">
                            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            <img className='mail-password' src={mail} alt="" />
                        </div>
                        <div className="img-form">
                            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} />
                            <img className='mail-password' src={clave} alt="" />
                            <img src={showPassword ? closeEyesImage : openEyesImage} alt="Mostrar contraseña" className="toggle-password" onClick={togglePasswordVisibility} />
                        </div>
                        <button type="submit">Iniciar sesión</button>
                        <p>{alerta}</p>
                    </form>
                    <div className="login-centro-section2-Oc">
                        <Link to="/recuperacontrasena">¿Olvidaste tu contraseña?</Link>
                    </div>
                </div>
                <div className="login-centro-section1">
                    <h2>Bienvenidos a Blends, Tu red social</h2>
                    <p>Estamos encantados de tenerte aquí en nuestra comunidad. Blends es más que una simple red social; es un lugar donde las ideas, las pasiones y las personas se mezclan para crear algo increíble.</p>
                    <div className="login-centro-section1-div">
                        <img className="login-centro-section1-img" src={persona} alt="" />
                        <p>1k+ Personas se han unido a Blends, ahora es tu turno</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
