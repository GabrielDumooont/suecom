const mongoose = require("mongoose")
const { Schema } = mongoose

const Categorias = new Schema({

    id_conta: { type: String, require: true },
    nome: { type: String, require: true },

}, {timestamps: true})

module.exports = mongoose.model('Categorias', Categorias)