const express           = require("express")
const cors              = require("cors")
const app               = express()

app.use(cors())
app.use(express.json())

app.listen(3000, function() {
    console.log("Servidor online!: http://localhost:3000")
})

const conn = require("./bd/conn")
conn()

const defauult = require("./public/routes/route_Default")
app.use("/", defauult)

const conta = require("./public/routes/route_Conta")
app.use("/", conta)

const produtos = require("./public/routes/route_Produtos")
app.use("/", produtos)

const imagensProduto = require("./public/routes/route_ImagensProduto")
app.use("/", imagensProduto)

const produtosVendas = require("./public/routes/route_ProdutosVenda")
app.use("/", produtosVendas)