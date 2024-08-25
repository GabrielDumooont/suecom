const mongoose = require("mongoose")
const { Schema } = mongoose

const Produtos = new Schema({

    id_conta: { type: String, require: true },
    nome: { type: String, require: true },
    descricao: { type: String, require: true },
    id_categoria: { type: String, require: true},
    preco: { type: Number, require: true },
    ativo: { type: Boolean, require: true },
    image_1: { type: String, require: true },
    image_2: { type: String, require: true },
    image_3: { type: String, require: true },
    image_4: { type: String, require: true },
    image_5: { type: String, require: true }

}, {timestamps: true})

module.exports = mongoose.model('Produtos', Produtos)