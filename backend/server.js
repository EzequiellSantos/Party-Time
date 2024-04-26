//modules
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

// routes
const authRouter = require("./routes/authRoutes.js")

// middlewares


// configurações
const dbname = "partyTimeb"
const port = 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
//atrela as rotas no express
app.use("/api/auth", authRouter)

// Conexão mongodb
mongoose.connect(`mongodb://127.0.0.1/${dbname}`)

app.get("/", (req, res) => {

    res.json({message: "Rota aberta"})

})

app.listen(port, () => {

    console.log(`O backend esta ativo em  ${port} :v`);

})