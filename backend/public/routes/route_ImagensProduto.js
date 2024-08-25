const router            = require("express").Router()
const mongoose          = require("mongoose")
const ImagensProduto    = require("../models/model_ImagensProduto")

router.get("/imagens-produto/:id_produto", async (req, res) => {
    const response = await ImagensProduto.find({ id_produto: req.params.id_produto })
    res.json(response)
})

router.get("/imagens-produto/index-0/:id_conta", async (req, res) => {
    const response = await ImagensProduto.find({ id_conta: req.params.id_conta, index: 0 })
    res.json(response)
})

router.delete("/imagens-produto/:id_produto", async (req, res) => {
    const response = await ImagensProduto.deleteMany({ id_produto: req.params.id_produto })
    res.json(response)
})

module.exports = router