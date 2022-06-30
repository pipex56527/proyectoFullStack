const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalSchema = new Schema({
    cedula: Number,
    nombre: String,
    apellido: String
});

// Si la colección no existe en MongoDB se crea, si existe entonces no hace nada, solo se define a nivel de la app.
// el guion bajo en el nombre del modelo al final se usa para que MongoDB no le agregue una 's' al final
// en el nombre de la coleccion. Esta es la forma en cómo identificamos la tabla a la que queremos acceder.

const Personal = mongoose.model('personal_', personalSchema);

module.exports = Personal;