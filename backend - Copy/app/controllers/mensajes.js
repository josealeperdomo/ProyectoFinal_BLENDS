const Mensaje = require('../models/mensaje');
const Conversacion = require('../models/conversacion')
const conversacion = require('../models/conversacion');
const { getReceiverSocketId, io} = require('../socket/socket');

const MensajesController = {
    enviarMensaje: async(req,res)=>{
        try {
            const { message } = req.body;
            const { id: receiverId } = req.params;
            const { senderId } = req.body
    
            let conversacion = await Conversacion.findOne({
                participantes: { $all: [senderId, receiverId] },
            });
    
            if (!conversacion) {
                conversacion = await Conversacion.create({
                    participantes: [senderId, receiverId],
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
    
           const receiverSocketId = getReceiverSocketId(receiverId)
           if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
           }
    
            res.status(201).json(newMessage);
        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    verMensajes: async(req,res)=>{
        try {
            const {id:userToChatId} = req.params
            const {senderId} = req.params

            const conversacion = await Conversacion.findOne({
                participantes: {$all: [senderId, userToChatId]},
            }).populate("messages")

            if(!conversacion) return res.status(200).json([])

            res.status(200).json(conversacion.messages)
        } catch (error) {
            console.log("Error: ", error.message);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = MensajesController;
