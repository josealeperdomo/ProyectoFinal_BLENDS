const Mensaje = require('../models/mensaje');
const Conversacion = require('../models/conversacion')
const { getReceiverSocketId, io } = require('socket.io')

const MensajesController = {
    enviarMensaje: async(req,res)=>{
        try {
            const { message } = req.body;
            const { id: receiverId } = req.params;
            const senderId = req.user._id;
    
            let conversacion = await Conversacion.findOne({
                participantes: { $all: [senderId, receiverId] },
            });
    
            if (!conversacion) {
                conversacion = await Conversacion.create({
                    participants: [senderId, receiverId],
                });
            }
    
            const newMessage = new Mensaje({
                senderId,
                receiverId,
                message,
            });
    
            if (newMessage) {
                conversacion.messages.push(newMessage._id);
            }
        
            await Promise.all([conversacion.save(), newMessage.save()]);
    
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }
    
            res.status(201).json(newMessage);
        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = MensajesController;
