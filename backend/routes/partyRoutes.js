const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const multer = require("multer") //biblioteca para fazer o upload de imagens

const Party = require("../models/party")
const User = require("../models/user")

// define file storage
const diskStorage = require("../helpers/file-storage")
const upload = multer({ storage: diskStorage })

// middlewares
const verifyToken = require("../helpers/check-token")

// helpers 
const getUserByToken =  require("../helpers/get-user-by-token")

// get party

router.get("/", verifyToken, (req, res) => [

    res.json({ msg:  "funcionando gay" })

])

module.exports = router
