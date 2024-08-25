const router        = require("express").Router()
const mongoose      = require("mongoose")

router.post("/default/:collection", async (req, res) => {
    const collection = require(`../models/${req.params.collection}`)
    const response = await collection.create(req.body)
    res.json(response);
})

router.get("/default/:collection/:id_conta", async (req, res) => {
    const collection = require(`../models/${req.params.collection}`)
    const response = await collection.find({ id_conta: req.params.id_conta })
    res.json(response);
})

router.get("/default-getOne/:collection/:_id", async (req, res) => {
    const collection = require(`../models/${req.params.collection}`)
    const response = await collection.find({ _id: req.params._id })
    res.json(response);
})

router.put("/default/:collection/:_id", async (req, res) => {
    const collection = require(`../models/${req.params.collection}`)
    const response = await collection.findByIdAndUpdate(req.params._id, req.body)
    res.json(response)
})

router.delete("/default/:collection/:_id", async (req, res) => {
    const collection = require(`../models/${req.params.collection}`)
    const response = await collection.findByIdAndDelete(req.params._id)
    res.json(response)
})

router.delete("/default/deleteAll/:collection/:id_conta", async (req, res) => {
    const collection = require(`../models/${req.params.collection}`)
    const response = await collection.deleteMany({ id_conta: req.params.id_conta })
    res.json(response)
})

module.exports = router