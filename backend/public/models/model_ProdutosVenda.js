const mongoose = require("mongoose")
const { Schema } = mongoose

const ProdutosVenda = new Schema({

    id_conta: { type: String, require: true },
    id_venda: { type: String, requir: true },
    nome: { type: String, require: true},
    preco: { type: Number, require: true},
    quantidade: { type: Number, require: true },
    total: { type: Number, require: true}

}, {timestamps: true})

module.exports = mongoose.model('ProdutosVenda', ProdutosVenda)