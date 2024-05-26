import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import useListenMessages from "../routes/UseListenMessages";



const noChatSelected = () => {
    
    return (
        <div className="contenedor">
            <span>Bienvenido</span>
            <span>Escoge un chat para comenzar</span>
        </div>
    );
};

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


const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:3000/mensajes/enviar/${selectedConversation._id}`, { message, senderId: userId });
            const data = res.data;
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:3000/mensajes/${selectedConversation._id}/${userId}`);
                const data = res.data;
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export function Messages() {
    const { selectedConversation } = useConversation();
    const { messages, loading } = useGetMessages();
    useListenMessages()

    const [message, setMessage] = useState("");

    const { sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        sendMessage(message);
        setMessage(""); 
    };

    return (
        <div className="contenedor">
            {!selectedConversation ? noChatSelected() : (
                <>
                    <div>
                        <span>to:</span>
                        <span>{selectedConversation.usuario}</span>
                    </div>
                    <div className="mensajes-container">
                        {loading ? (
                            <p>Cargando mensajes...</p>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg._id} className="mensaje">
                                    <span className="mensaje-usuario">{msg.senderId === userId ? "Tú" : selectedConversation.usuario}</span>
                                    <p className="mensaje-contenido">{msg.message}</p>
                                    <span className="mensaje-fecha">{new Date(msg.createdAt).toLocaleString()}</span>
                                </div>
                            ))
                        )}
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Escriba su mensaje"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button type="submit">Enviar</button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
