const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('pergunta',{
    createdAt:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force:false})
    .then(()=>{
        console.log('tabela criada com sucesso')
    })

    module.exports = Pergunta
