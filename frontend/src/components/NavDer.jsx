import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Components.css";

function NavDer() {
    const [usuariosAleatorios, setUsuariosAleatorios] = useState([]);

    useEffect(() => {
        const obtenerUsuariosAleatorios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/users/sugeridos'); // Cambia la URL según la ruta de tu API
                setUsuariosAleatorios(response.data);
                console.log(usuariosAleatorios);
            } catch (error) {
                console.error('Error al obtener usuarios aleatorios:', error);
            }
        };

        obtenerUsuariosAleatorios();
    }, []); // El segundo argumento vacío asegura que useEffect solo se ejecute una vez (cuando el componente se monta)

    return (
        <>
            <section className="lateral-derecha-opciones shadow">
                <div className="row ">
                    <div className="row_title">
                        <span>Friend Suggestions</span>
                    </div>
                    {usuariosAleatorios.map(usuario => (
                        <div className="row_contain" key={usuario.id}>
                            <img src={usuario.imagen_perfil} alt="" />
                            <div className='info-navder'> 
                                <span><b>{usuario.usuario}</b></span>
                            </div>
                            <button>+</button>
                        </div>
                    ))}
                </div>
                <a href="/PagoPremium">
                    <div href="/PagoPremium" className='seccion-Premium'> 
                        <p>Cambiate a premium</p>
                        <button className='botonPremium diagonal-hover '>Premium</button>
                    </div>
                </a>
            </section>
        </>
    );
}

export default NavDer;