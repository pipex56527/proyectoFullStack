const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    codigo: Number,
    contrasenia: String,
    rol: Number
});

// crear modelo => Se crea en mongoDB como schema='sala' o sea le agrega la s

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;