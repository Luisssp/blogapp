const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
//rotas
router.use(express.json())

router.get('/', (req, res) => {

})
// lista as categorias 
router.get('/categorias', (req, res) => {
    Categoria.find().sort({ date: 'desc' }).then((categor) => {
        console.log('lista de categoria ok')
        res.json(categor)
    }).catch((err) => {
        console.log('erro ao listar' + err)
        return res.status(400).json({ message: 'erro ao Lstar' });
    })
})
// Verifica se existe a categoria
router.get("/categorias/edit/:id", (req, res) => {
    Categoria.findOne({ _id: req.params.id }).then((categor) => {
        console.log('categoria existe')
        res.json(categor)
    }).catch((err) => {
        console.log('categoria nao existe' + err)
        return res.status(400).json({ message: 'categoria nao existe' });
    })
})
//edit a categoria
router.post("/categorias/edit", (req, res) => {
    //valida os campos
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'nome invalido' })
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: 'slug invalido' })
    }
    if (!req.body.id || typeof req.body.id == undefined || req.body.id == null) {
        erros.push({ texto: 'id invalido' })
    }
    if (erros.length > 0) {
        return res.status(400).json(erros)
    }
    Categoria.findOne({ _id: req.body.id }).then((categor) => {
        categor.nome = req.body.nome
        categor.slug = req.body.slug
        categor.save().then(() => {
            res.json({ message: 'categoria editada com sucesso' })
        }).catch((err) => {
            return res.status(400).json({ message: 'erro ao editar' });
        })
    }).catch((err) => {
        console.log('categoria nao existe' + err)
        return res.status(400).json({ message: 'categoria nao existe' });
    })
})
// cadastra uma nova Categoria
router.post('/categorias/nova', (req, res) => {
    //valida os campos
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'nome invalido' })
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: 'slug invalido' })
    }
    if (req.body.nome.length < 2) {
        erros.push({ texto: "Nome da categoria muito pequeno" })
    }
    if (erros.length > 0) {
        return res.status(400).json(erros)
    }
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    //console.log(novaCategoria)
    new Categoria(novaCategoria).save().then(() => {
        console.log('categoria salva com sucesso')
        res.json(novaCategoria)
    }).catch((err) => {
        console.log('erro ao salvar a categoria' + err)
        return res.status(400).json({ message: 'erro ao salvar' });
    })
})

router.delete("/categorias/edit/:id", (req, res) => {
    Categoria.deleteOne({ _id: req.params.id }).then(() => {
        res.json({ message: 'categoria deletada com sucesso' })
    }).catch((err) => {
        return res.status(400).json({ message: 'categoria não encontrada' });
    })
})

module.exports = router

