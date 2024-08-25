const mongoose = require("mongoose")
const { Schema } = mongoose

const ImagensProduto = new Schema({

    id_conta: { type: String, require: true },
    id_produto: { type: String, require: true },
    index: { type: Number, require: true },
    base64:{ type: String, require: true },
    altura: { type: Number, require: true },
    largura: { type: Number, require: true },

}, {timestamps: true})

module.exports = mongoose.model('ImagensProduto', ImagensProduto)