const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var usuarioSchema = Schema({
    nombre: String,
    apellido: String,
    edad: String
})

module.exports = mongoose.model('usuario',usuarioSchema)