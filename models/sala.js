const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salaSchema = new Schema({
    codigo: Number,
    nombre: String,
    nivelEmergencia: Number
});

// crear modelo => Se crea en mongoDB como schema='sala' o sea le agrega la s

const Sala = mongoose.model('sala', salaSchema);

module.exports = Sala;