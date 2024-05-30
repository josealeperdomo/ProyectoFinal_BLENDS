import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import "../styles/General.css";
import "../styles/Components.css";
import "../styles/index.css";
import "../styles/Chats.css";
import useConversation from '../zustand/useConversation';
import { useSocketContext } from '../routes/SocketContext';
import buscar from "../assets/buscar.svg";



export function SidebarChat() {
    const [amigos, setAmigos] = useState([]);
    
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
        const fetchAmigos = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/amigos/${userId}`);
                if (Array.isArray(response.data)) {
                    setAmigos(response.data);
                } else {
                    setAmigos([]);
                }
            } catch (error) {
                console.error('Error al obtener amigos:', error);
                setAmigos([]);
            }
        };

        fetchAmigos();
    }, [userId]);

    const { selectedConversation, setSelectedConversation } = useConversation();

    const [search, setSearch] = useState("")

    const handleSearch = (e)=>{
        e.preventDefault()
        if(!search) return
        if(search.length < 3) {
            toast.error("Debe tener mas de 3 caracteres")
        }

        const conversation = amigos.find((c)=> c.usuario.toLowerCase().includes(search.toLowerCase()))

        if(conversation){
            setSelectedConversation(conversation)
            setSearch("")
        }else toast.error("No encontrado")
    }

    const {onlineUsers} = useSocketContext()

    return (
        <div className='sidebar'>
            <div className=''>
                <form className='form-buscar-chat' onSubmit={handleSearch} action="">
                    <input className='input-buscar-chat'type="text" placeholder="Buscar" value={search} onChange={e=>setSearch(e.target.value)}/>
                    <button><img src={buscar} alt="" /></button>
                </form>
            </div>
            <div>
                {/* Verificar si hay amigos */}
                {amigos.length === 0 ? (
                    <p>No tienes amigos.</p>
                ) : (
                    <ul className='amigos-seccion'>
                        {amigos.map(amigo => (
                            <li key={amigo._id}>
                                <div className={`flex gap-2 items-center hover:bg-zinc-300 rounded p-2 py-1 cursor-pointer ${selectedConversation?._id === amigo._id ? "bg-zinc-200" : ""}`} onClick={() => setSelectedConversation(amigo)}>
                                    <div className={onlineUsers.includes(amigo._id) ? "circleGreen":"circleGray"}></div>
                                    <img className="avatar" src={amigo.imagen_perfil} alt={amigo.usuario} />
                                    <p>{amigo.usuario}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}