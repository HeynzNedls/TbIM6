const app = require ('./app')

const port = 1573

app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}/`)
})