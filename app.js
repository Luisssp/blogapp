//carregando modulos
const express = require('express')
const app = express()
const admin = require("./routes/admin")
const mongoose = require('mongoose')
// Configurações
app.use(express.json())
// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log("conectado ao mongo")
}).catch((err) => {
    console.log("Erro ao conectar ao mongo")
})
//rotas
app.use('/admin', admin)

//Outros
const Port = 3333
app.listen(Port, () => {
    console.log('Servidor rodando')
})