import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Components.css";
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

function NavDer() {
    const [usuariosAleatorios, setUsuariosAleatorios] = useState([]);
    const [infoUsuario, setInfoUsuario] = useState(null);

    const getTokenPayload = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            return JSON.parse(payloadJson);
        } catch (error) {
            console.error('Error parsing token payload:', error);
            return null;
        }
    };

    const payload = getTokenPayload();
    const userId = payload ? payload.id : null;

    useEffect(() => {
        const obtenerUsuariosAleatorios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/users/sugeridos');
                setUsuariosAleatorios(response.data);
                console.log(response.data); // Asegúrate de que los datos están correctos
            } catch (error) {
                console.error('Error al obtener usuarios aleatorios:', error);
            }
        };

        obtenerUsuariosAleatorios();
    }, []); // El segundo argumento vacío asegura que useEffect solo se ejecute una vez (cuando el componente se monta)

    const handleEnviarSolicitud = async (idReceptor) => {
        if (idReceptor === userId) return alert("No puedes enviarte una solicitud a ti mismo");
        try {
            const response = await axios.post('http://localhost:3000/amistad/enviarSolicitud', {
                id_emisor: userId,
                id_receptor: idReceptor
            });
            if (response.status === 200) {
                Swal.fire({
                    title: "Solicitud de amistad enviada exitosamente",
                    text: "Su solicitud ha sido enviada",
                    icon: "success"
                  });    
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de amistad:', error);
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message || 'Error al enviar la solicitud de amistad',
                icon: "error"
              });
        }
    };

    useEffect(() => {
        if (!userId) return; // Asegúrate de que userId está definido antes de hacer la llamada

        const obtenerUsuarioPorId = async (usuarioId) => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${usuarioId}`);
                setInfoUsuario(response.data); // Asegúrate de asignar la parte correcta de la respuesta
                console.log(response.data); // Verifica que los datos son los esperados
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
            }
        };

        obtenerUsuarioPorId(userId);
    }, [userId]);

    const usuariosFiltrados = usuariosAleatorios.filter(usuario => 
        usuario._id !== userId && !infoUsuario?.amigos.includes(usuario._id)
    );

    return (
        <section className="lateral-derecha-opciones shadow">
            <div className="row">
                <div className="row_title">
                    <span>Friend Suggestions</span>
                </div>
                {usuariosFiltrados.map(usuario => (
                    <div className="row_contain" key={usuario.id}>
                        <img src={usuario.imagen_perfil} alt="" />
                        <div className='info-navder'> 
                            <span><b><Link to={`/perfil/${usuario.usuario}`}>{usuario.usuario}</Link></b></span>
                        </div>
                        <button onClick={() => handleEnviarSolicitud(usuario._id)}>+</button>
                    </div>
                ))}
            </div>
            {infoUsuario?.membresia != 'premium' ? (
                <Link to="/PagoPremium">
                    <div className='seccion-Premium'> 
                        <p>Cámbiate a premium</p>
                        <button className='botonPremium diagonal-hover'>Premium</button>
                    </div>
                </Link>
            ) : null}
        </section>
    );
}

export default NavDer;
