import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();


export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();
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
		if (authUser) {
			const socket = io("http://sa.backendprueba.xyz:3001", {query: {
				userId: userId
			}});

			setSocket(socket);

			socket.on('getOnlineUsers', (users)=> {
				setOnlineUsers(users)
			})

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};