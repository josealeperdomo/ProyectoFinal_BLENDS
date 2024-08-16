const mongoose = require('mongoose');

const PagoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    fecha_pago: {
        type: Date,
        default: Date.now
    },
    metodo_pago: {
        type: String,
        enum: ['transferencia', 'pagomovil', "Pago Movil", "Transferencia"],
        required: true
    },
    banco: {
        type: String,
        enum: ['Bancamiga', 'Mercantil', 'Banesco'],
        required: true
    }
    ,
    numero_ref: {
        type: String,
        required: true
    }
    ,
    estado_pago: {
        type: String,
        enum: ['pendiente', 'completado', 'cancelado'],
        default: 'pendiente'
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Pago', PagoSchema);
