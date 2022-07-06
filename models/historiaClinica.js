const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historiaClinicaSchema = new Schema({
    fechaRegistro: Number,
    idMascota: String,
    medico: Number,
    descripcion: String
});

// crear modelo => Se crea en mongoDB como schema='mascotas' o sea le agrega la s

const HistoriaClinica = mongoose.model('historiaclinica', historiaClinicaSchema);

module.exports = HistoriaClinica;