const multer = require("multer");
const path = require("path")

const diskStorage = multer.diskStorage({

    destination: (req, res, cb) => { // onde os arquivos serão salvos e qual o padrão de nomes
        cb(null, 'pulic/img')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

module.exports = diskStorage
