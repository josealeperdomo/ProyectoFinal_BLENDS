import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png"
import persona from "../img/personasimg.png"
import openEyesImage from '../img/openeyes.png';
import closeEyesImage from '../img/closeeyes.png';
import mail from '../assets/mail.svg';
import clave from '../assets/password.svg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'


export function Login(){
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    let [alerta, setAlerta] = useState("")
    const navigate = useNavigate();
    const logearse = (e)=>{
        e.preventDefault()
        setAlerta("")
        if(!password || !email){
            setAlerta("Todos los campos deben estar llenos")
            return 
        }

        axios.post('http://localhost:3000/login', {
            email,
            password
          })
          .then(function (response) {
            console.log(response);
            setAlerta(response.data.message)
            const token = response.data.token;
            localStorage.setItem('token', token)
            navigate('/home')
          })
          .catch(function (error) {
            console.log(error);
          });        
    }

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")


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
                            <form action="" onSubmit={logearse}>
                                <div className="img-form">
                                    <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                                    <img className='mail-password' src={mail} alt="" />
                                </div>

                                <div className="img-form">
                                    <input type={showPassword ? "text" : "password"} placeholder="Contraseña" onChange={(e)=>setPassword(e.target.value)}/>
                                    <img className='mail-password' src={clave} alt="" />
                                    <img src={showPassword ? closeEyesImage : openEyesImage} alt="Mostrar contraseña" className="toggle-password" onClick={togglePasswordVisibility} />

                                </div>
                                <button>Iniciar sesion</button>
                                <p>{alerta}</p>
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
