const {Sequelize} = require('sequelize')

//DATABASE:::
const sequelize = new Sequelize('perguntas', 'root', 'masterkey', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;