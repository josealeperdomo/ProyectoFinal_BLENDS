const mongoose = require('mongoose');

const ConversacionSchema = new mongoose.Schema(
	{
		participantes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		mensajes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true,
      versionKey: false
     }

);

module.exports = mongoose.model('Conversacion', ConversacionSchema);
