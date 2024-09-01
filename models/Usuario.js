/* 
    Creacion de esquemas de la base de datos de MongoDB
*/

const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }, 
    edad: {
        type: Number,
    },
    direccion: {
        type: String,
    },
    telefono: {
        type: Number,
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true,
    }
    
});

module.exports = model('Usuario', UsuarioSchema);
