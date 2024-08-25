const router        = require("express").Router()
const mongoose      = require("mongoose")
const ProdutosVenda = require("../models/model_ProdutosVenda")

router.get("/produtos-venda/:id_venda", async (req, res) => {
    const response = await ProdutosVenda.find({ id_venda: req.params.id_venda })
    res.json(response)
})

router.delete("/produtos-venda/:id_venda", async (req, res) => {
    const response = await ProdutosVenda.deleteMany({ id_venda: req.params.id_venda })
    res.json(response)
})

module.exports = router