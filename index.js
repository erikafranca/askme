const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./database/database')
const pergunta = require('./database/Pergunta')
const Pergunta = require("./database/Pergunta")


//conexão no BD
sequelize.authenticate()
    .then(()=>{
        console.log("conexão realizada com sucesso")
    }).catch(()=>{
        console.log("erro")
    })

//decodificar dados de formulario para utilização em js
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//rodar views com EJS
app.set('view engine', 'ejs')
app.use(express.static('public'))

//setar rotas
app.get('/', (req,res)=>{
    pergunta.findAll({raw:true})
        .then(perguntas=>{
            res.render("index",{
                perguntas: perguntas
            })
       })   
})

app.get('/perguntar', (req,res)=>{
    res.render('perguntar')
})

app.post("/salvarPergunta", (req, res)=>{
   const titulo = req.body.titulo
   const descricao = req.body.descricao
    
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        
        res.redirect("/")
    }).catch((e)=>{
        console.log(e)
    })
})
//iniciando servidor

app.listen(8181, ()=>{
   console.log('ok')
})

