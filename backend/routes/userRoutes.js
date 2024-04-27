const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const User =  require("../models/user")

// middlewares
const verifyToken = require("../helpers/check-token")

// get an user for id
router.get("/:id", verifyToken, async (req, res) => {

    const id = req.params.id

    // verify user
    try {
        
        const user = await User.findOne({ _id: id}, { password: 0 }) //ocultar dados desnecessários

        res.json({error: null, user})

    } catch (err) {

        return res.status(400).json({ error: "O usuário não existe!"})

    }

})

// update an user
router.put("/", verifyToken, async (req, res) => {

})

module.exports = router