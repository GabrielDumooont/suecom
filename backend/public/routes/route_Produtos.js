const router        = require("express").Router()
const mongoose      = require("mongoose")
const Produtos      = require("../models/model_Produtos")

router.put("/produtos_images/:_id/:key", async (req, res) => {
    const produto = await Produtos.findById(req.params._id)

    for (let key in produto) {
        if (key == req.params.key){
            // console.log(req.body.base64)
            produto[key] = req.body.base64
            const response = await Produtos.findByIdAndUpdate(req.params._id, produto)
            res.json(response)
            break
        }
    }
})

router.delete("/produtos/:id_categoria", async (req, res) => {
    const response = await Produtos.deleteMany({ id_categoria: req.params.id_categoria })
    res.json(response)
})

module.exports = router