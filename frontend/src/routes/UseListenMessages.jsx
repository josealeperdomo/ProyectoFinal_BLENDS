import { useEffect } from "react";

import { useSocketContext } from "../routes/SocketContext";
import useConversation from "../zustand/useConversation";
import notificacion from '../assets/sounds/notificacion.mp3'

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificacion)
            sound.play()
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;