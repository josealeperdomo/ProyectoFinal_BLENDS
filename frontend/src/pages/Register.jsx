import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png"
import openEyesImage from '../img/openeyes.png';
import closeEyesImage from '../img/closeeyes.png';
import user from '../assets/user.svg';
import mail from '../assets/mail.svg';
import clave from '../assets/password.svg';
import axios from 'axios'
import { Link } from 'react-router-dom';
export function Register(){
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    let [alerta, setAlerta] = useState("")
    const registrarse = (e)=>{
        e.preventDefault()
        setAlerta("")
        if(!usuario || !password || !email){
            setAlerta("Todos los campos deben estar llenos")
            return 
        }
        const reguser = /^[a-zA-Z0-9_-]{3,16}/
        const regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const regpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if(!reguser.test(usuario)){
            setAlerta("Usuario Invalido")
            return
        }
        if(!regemail.test(email)){
            setAlerta("Email Invalido")
            return
        }
        if(!regpassword.test(password)){
            setAlerta("Contrasena Invalida")
            return
        }

        axios.post('http://localhost:3000/users', {
            usuario,
            email,
            password
          })
          .then(function (response) {
            console.log(response.data.Message);
            setAlerta(response.data.Message)
          })
          .catch(function (error) {
            console.log(error);
          });        
    }

    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

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
                            <form action="" onSubmit={registrarse}>
                                <div className="img-form">
                                    <input type="text" placeholder="Usuario" onChange={(e)=>setUsuario(e.target.value)}/>
                                    <img className='mail-password' src={user} alt="" />
                                </div>
                                <div className="img-form">
                                    <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                                    <img className='mail-password' src={mail} alt="" />
                                </div>

                                <div className="img-form">
                                    <input type={showPassword ? "text" : "password"} placeholder="Contraseña" onChange={(e)=>setPassword(e.target.value)} />
                                    <img className='mail-password' src={clave} alt="" />
                                    <img src={showPassword ? closeEyesImage : openEyesImage} alt="Mostrar contraseña" className="toggle-password" onClick={togglePasswordVisibility} />

                                </div>
                                <p>{alerta}</p>
                                <button>Registrarse</button>
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