const express = requirer ('express')
const cors = requirer ('cors')
const app = express()

app.use(express.json())
app.use(cors())

const animesController = require ('./controllers/animesController')

animesController.rotas(app)

module.exports = app