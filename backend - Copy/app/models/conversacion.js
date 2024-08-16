const mongoose = require('mongoose');

const ConversacionSchema = new mongoose.Schema(
	{
		participantes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Mensaje",
				default: [],
			},
		],
	},
	{ timestamps: true,
      versionKey: false
     }

);

module.exports = mongoose.model('Conversacion', ConversacionSchema);
