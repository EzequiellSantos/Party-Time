require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// routes
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const partyRouter = require("./routes/partyRoutes.js");

// configurações
const dbname = "partyTimeb";
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const port = process.env.PORT || 3000;

const app = express();

// Configuração explícita do CORS para liberar todas as origens
app.use(cors({
  origin: '*', // Permite todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static('public'));

// atrelar as rotas no express
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/party", partyRouter);

// Conexão mongodb
mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster1.nax4gsf.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster1`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.json({ message: "Rota aberta" });
});

app.get("/api/auth", (req, res) => {
    res.json({ message: "Funciona" });
});

app.listen(port, () => {
    console.log(`O backend está ativo em ${port} :v`);
});

app.use((req, res, next) => {
  console.log('CORS middleware called');
  next();
});


module.exports = app;