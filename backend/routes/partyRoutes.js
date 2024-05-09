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
const getUserByToken = require("../helpers/get-user-by-token")

// create a new party
router.post("/", verifyToken, upload.fields([{ name: "photos" }]), async (req, res) => {

    // req data
    const title = req.body.title
    const description = req.body.description
    const partyDate = req.body.party_date

    let files = []

    if (req.files) { // verificar se o usuário fez uma festa sem fotos
        files = req.files.photos
    }

    //validations
    if (title == "null" || description == "null" || partyDate == "null") {
        return res.status(400).json({ error: "Preenhca todos os campos (título, descrição e data)" })
    }

    // verify user 

    const token = req.header("auth-token")

    const userByToken = await getUserByToken(token)

    const userId = userByToken._id.toString()

    try {

        const user = await User.findOne({ _id: userId })

        // create photos array with image path
        let photos = []

        if (req.files && req.files.photos &&  req.files.photos.length > 0) {

            // sending photos path
            photos = req.files.photos.map(file => file.path)

        }

        // criando model
        const party = new Party({
            title: title,
            description: description,
            partyDate: partyDate,
            photos: photos,
            privacy: req.body.privacy,
            userId: user._id.toString()

        })

        // inserindo dados
        try {

            const newParty = await party.save()
            res.json({ error: null, msg: "Evento criado com sucesso", data: newParty })

        } catch (error) {

            console.error(error);
            return res.status(400).json({ error })

        }

    } catch (err) {

        console.error(err);
        return res.status(400).json({ error: "Acesso negado" }), console.log(err)

    }


})

// get all public parties
router.get("/all", async (req, res) => {

    // buscando objetos com os ids em primeiro
    try {

        const parties = await Party.find({ privacy: false }).sort([["_id", -1]])
        res.json({ error: null, parties: parties })


    } catch (error) {

        console.error(error);
        return res.status(400).json({ error }), console.log(error)

    }

})

// get all user parties
router.get("/userparties", verifyToken, async (req, res) => {

    try {

        const token = req.header("auth-token")

        const userByToken = await getUserByToken(token)

        const userId = userByToken._id.toString()

        const allUserParties = await Party.find({ userId: userId })

        res.json({ error: null, parties: allUserParties })


    } catch (error) {

        console.error(error);
        return res.status(400).json({ error })

    }

})

// get user party
router.get("/userparty/:id", verifyToken, async (req, res) => {

    try {

        const token = req.header("auth-token")

        const user = await getUserByToken(token)

        const userId = user._id.toString()

        const partyId = req.params.id

        const party = await Party.findOne({ _id: partyId, userId: userId })

        // check if the party was deleted
        if (party == null) {

            res.json({ error: "Esse evento foi removido", })

        } else {

            res.json({ error: null, party: party })

        }

    } catch (error) {

        console.error(error);
        return res.status(400).json({ error }), console.log(error);

    }

})

// get party (public or private)
router.get("/:id", async (req, res) => {

    try {

        // find party
        const id = req.params.id

        const party = await Party.findOne({ _id: id })

        // public party
        if (party.privacy === false) {

            res.json({ error: null, party: party })

        } else {

            const token = req.header("auth-token")

            const user = await getUserByToken(token)

            const userId = user._id.toString()

            const partyUserId = party.userId.toString()

            // check if user id is = yto party user id
            if (userId == partyUserId) {

                res.json({ error: null, party: party })

            }

        }

    } catch (err) {

        console.error(err);
        return res.status(400).json({ msg: "Este evento não existe" })

    }

})

// delete a party
router.delete("/", verifyToken, async (req, res) => {

    const token = req.header('auth-token')

    const user = await getUserByToken(token)

    const partyId = req.body.id

    const userId = user._id.toString()

    try {

        await Party.deleteOne({ _id: partyId, userId: userId })

        res.json({ error: null, msg: 'Evento deletado com sucesso' })

    } catch (err) {

        console.error(err);
        res.status(400).json({ error: "Acesso Negado" })

    }

})

// update the party 
router.put("/", verifyToken, upload.fields([{ name: "photos" }]), async (req, res) => {

    // req body
    const title = req.body.title
    const description = req.body.description
    const partyDate = req.body.partyDate
    const partyId = req.body._id
    const partyUserId = req.body.user_id

    let files = []

    if (req.files) { //verificar se o usuário fez uma festa sem fotosz

        files = req.files.photos

    }

    //validations
    if (title == "null" || description == "null" || partyDate == "null") {
        return res.status(400).json({ error: "Preenhca todos os campos (Título, descrição e data)" })
    }

    // verify user
    const token = req.header("auth-token")

    const userByToken = await getUserByToken(token)

    const userId = userByToken._id.toString()

    if (userId != partyUserId) {

        return res.status(400).json({ error: "Acesso negado" })

    }

    // build party object
    const party = {
        id: partyId,
        title: title,
        description: description,
        partyDate: partyDate,
        privacy: req.body.privacy,
        userId: userId
    }

    // create photos array with image path
    let photos = []

    if (files && files.length > 0) {

        files.forEach((photos, i) => { // sending photos path
            photos[i] = photos.path
        })

        party.photos = photos

    }

    try {

        // returns updated data
        const updateParty = await Party.findOneAndUpdate({ _id: partyId, userId: userId }, { $set: party }, { new: true })
        res.json({ error: null, msg: "Evento atualizado com sucesso", data: updateParty })
        console.log(updateParty);

    } catch (error) {

        console.error(error);
        res.status(400).json({ error })

    }

})

module.exports = router
