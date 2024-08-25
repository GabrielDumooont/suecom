const router        = require("express").Router()
const mongoose      = require("mongoose")
const Conta         = require("../models/model_Conta")

router.post("/conta", async (req, res) => {
    const verifyEmail = await Conta.findOne({ email: req.body.email })
    if (verifyEmail == null){
        const verifyNomeLoja = await Conta.findOne({ nome_loja: req.body.nome_loja })
        if (verifyNomeLoja == null){
            const response = await Conta.create(req.body)
            res.json(response)
        } else {
            res.json({ msg: "Este nome já está em uso!"})
        }
    } else {
        res.json({ msg: "Este e-mail já está em uso!" })
    }
})

router.get("/conta/:email/:senha", async (req, res) => {
    const verify = await Conta.findOne({ email: req.params.email, senha: req.params.senha })
    res.json(verify)
})

router.get("/conta/:path_loja", async (req, res) => {
    const verify = await Conta.findOne({ path_loja: req.params.path_loja })
    res.json(verify)
})

router.put("/conta", async (req, res) => {
    const verifyNomeLoja = await Conta.findOne({ path_loja: req.body.path_loja })
    if (verifyNomeLoja != null){
        if (verifyNomeLoja._id == req.body._id){
            const response = await Conta.findByIdAndUpdate(req.body._id, req.body)
            res.json(response)
        } else {
            res.json({ msg: "Este nome já está em uso!" })
        }
    } else {
        const response = await Conta.findByIdAndUpdate(req.body._id, req.body)
        res.json(response)
    }
})

module.exports = router