const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
    nombre: String,
    descripcion: String,
    ubicacion: String,
    medicoAtiende: Number,
    edad: Number,
    motivoIngreso: String,
    fechaIngreso: Number,
    fechaSalida: Number
});

// crear modelo => Se crea en mongoDB como schema='mascotas' o sea le agrega la s

const Mascota = mongoose.model('mascota', mascotaSchema);

module.exports = Mascota;