import React, { useState } from 'react';
import "../styles/General.css";
import "../styles/Login.css";
import Logo from "../img/LogoBlends.png"
import openEyesImage from '../img/openeyes.png';
import closeEyesImage from '../img/closeeyes.png';
import user from '../assets/user.svg';
import mail from '../assets/mail.svg';
import namelname from '../assets/namelname.svg';
import clave from '../assets/password.svg';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export function Register(){
    const [showPassword, setShowPassword] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const reguser = /^[a-zA-Z0-9_-]{3,16}$/;
    const regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const registrarse = (e) => {
        e.preventDefault();
        setAlerta("");

        if (!nombre || !apellido || !usuario || !email || !password) {
            setAlerta("Todos los campos son requeridos");
            return;
        }

        if (!reguser.test(usuario)) {
            setAlerta("El nombre de usuario debe contener solo letras, números y guiones bajos. De 3 a 16 caracteres.");
            return;
        }

        if (!regemail.test(email)) {
            setAlerta("El correo electrónico no tiene un formato válido.");
            return;
        }

        if (!regpassword.test(password)) {
            setAlerta("La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una minúscula, un número y un carácter especial.");
            return;
        }

        // Recolectar los datos del formulario
        const data = {
            nombre,
            apellido,
            usuario,
            email,
            password
        };

        // Enviar los datos al servidor
        axios.post('http://localhost:3000/users', data)
        .then(function (response) {
            console.log(response.data.Message);
            Swal.fire({
                title: "Usuario creado correctamente",
                text: "Ya puede iniciar sesion",
                icon: "success",
                didClose: ()=>{
                    window.location.replace("/")
                }
              });    
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

    return(
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
                        <h1>Registrate</h1>
                        <p>¿Ya tienes cuenta? <a href="/">inicia sesion</a></p>
                        <form action="" onSubmit={registrarse}>
                            <div className="img-form">
                                <input type="text" placeholder="Nombre" onChange={(e)=>setNombre(e.target.value)} />
                                <img className='mail-password' src={namelname} alt="" />
                            </div>
                            <div className="img-form">
                                <input type="text" placeholder="Apellido" onChange={(e)=>setApellido(e.target.value)} />
                                <img className='mail-password' src={namelname} alt="" />
                            </div>
                            <div className="img-form">
                                <input type="text" placeholder="Usuario" onChange={(e)=>setUsuario(e.target.value)} />
                                <img className='mail-password' src={user} alt="" />
                            </div>
                            <div className="img-form">
                                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
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
                            <a href="/recuperacontrasena">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
