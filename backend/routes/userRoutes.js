const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const User =  require("../models/user")

// get an user for id
router.get("/:id", async (req, res) => {

    const id = req.params.id

    // verify user
    try {
        
        const user = await User.findOne({ _id: id}, { password: 0 }) //ocultar dados desnecessários

        res.json({error: null, user})

    } catch (err) {

        return res.status(400).json({ error: "O usuário não existe!"})

    }

})

module.exports = router