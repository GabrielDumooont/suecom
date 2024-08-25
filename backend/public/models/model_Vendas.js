const mongoose = require("mongoose")
const { Schema } = mongoose

const Vendas = new Schema({

    id_conta: { type: String, require: true },
    nome_cliente: { type: String, require: true},
    telefone_cliente: { type: String, require: true},
    data: { type: Date, require: true },
    total: { type: Number, require: true}

}, {timestamps: true})

module.exports = mongoose.model('Vendas', Vendas)