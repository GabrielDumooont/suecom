const mongoose = require("mongoose")
const { Schema } = mongoose

const Conta = new Schema({

    nome_loja: { type: String, require: true },
    cor_loja: { type: String, require: true },
    modoEscuro_loja: { type: Boolean, require: true },
    telefone: { type: String, require: true },
    email: {type: String, require: true},
    senha: {type: String, require: true},
    image: { type: String, require: true },
    path_loja: { type: String, require: true }


}, {timestamps: true})

module.exports = mongoose.model("Conta", Conta)