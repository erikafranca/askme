const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./database/database')
const pergunta = require('./database/Pergunta')
const Pergunta = require("./database/Pergunta")
const Resposta = require('./database/Resposta')

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
    pergunta.findAll({raw:true, order:[
        ['ID', 'DESC']
    ]})
        .then(perguntas=>{
            res.render("index",{
                perguntas: perguntas
                
            })
       })   
})

app.get('/perguntar/:id', (req,res)=>{
    const id = req.params.id
    pergunta.findOne({
        where: {id:id}
    }).then(pergunta=>{
        if(pergunta != undefined){
            Resposta.findAll({
                where:{perguntaId: pergunta.id},
                order:[ ['id', 'DESC'] ]
            }).then(respostas=>{
                 
                res.render('idpergunta',{
                    pergunta: pergunta,
                    respostas: respostas
            })
            
            })
        }
        else{
            res.redirect('/') 
        }
    })
})

app.get('/perguntar', (req,res)=>{
    res.render('perguntar')
})

//POST para salvar em banco de dados
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

app.post('/salvarResposta',(req, res)=>{
    const corpo = req.body.corpo
    const perguntaId= req.body.pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect('/perguntar/'+perguntaId)
    }).catch((e)=>{
        console.log(e)
    })

})

//iniciando servidor

app.listen(8181, ()=>{
   console.log('ok')
})

