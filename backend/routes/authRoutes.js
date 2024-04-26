const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/use")

// register an user
router.post("/register", async (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    // check for required fields
    if(name == null || email == null || password == null || confirmpassword == null ){
        return res.status(400).json({error: 'Por favor Preencha todos os campos!'})
    }

    // check if password match
    if(password != confirmpassword){
        return res.status(400).json({ error: 'As senhas não coincidem!'})
    }

    // cehck if user exists
    const emailExists = await User.findOne({ email: email})

    if(emailExists){
        return res.status(400).json({error: "O e-mail informado ja está em uso!"})
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordhash = await bcrypt.hash(password, salt)
    console.log(passwordhash);

})

module.exports = router