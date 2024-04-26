const mongoose = require('mongoose')

const partySchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    partyDate: {
        type: Date
    },
    photos: {
        type: Array // as fotos não vão ser inseridas diretamente no banco e sim apenas os caminhos delas
    },
    privacy: {
        type: Boolean
    },
    userId:{
        type: mongoose.objectId
    }

})

const Party = mongoose.model("Party", partySchema)

module.exports = Party