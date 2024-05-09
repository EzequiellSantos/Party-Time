const multer = require("multer");
const path = require("path")

const diskStorage = multer.diskStorage({

    destination: (req, res, cb) => { // onde os arquivos serão salvos e qual o padrão de nomes
        cb(null, 'public/img/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

module.exports = diskStorage
