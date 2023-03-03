const AnimesDAO = require('../DAO/AnimesDAO.js')
 
class animeController {
  static rotas(app){
    app.get('/anime', animeController.listar)
    app.post('/anime', animeController.inserir)
    app.delete('/anime/:id', animeController.deletar)
    app.put('/anime/:id', animeController.atualizar)
  }

  static async listar(req, res){
    const animes = await AnimesDAO.listar()

    res.status(200).send(animes)
  }

  static async inserir(req, res){
    const animes = {
      titulo: req.body.titulo,
      episodios: req.body.episodios,
      temporadas: req.body.temporadas,
      status: req.body.status
    }

    const result = await AnimesDAO.inserir(animes)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.status(201).send(result)
  }

  static async deletar(req, res){
    const animes = await AnimesDAO.deletar(req.params.id)

    if(animes.erro){
        res.status(500).send('Erro ao tentar deletar anime')
    }

    res.status(204).send({mensagem: 'Anime removido com sucesso'})
  }

  static async atualizar(req, res){
    const animes = {
      titulo: req.body.titulo,
      episodios: req.body.episodios,
      temporadas: req.body.temporadas,
      status: req.body.status
    }

    const result = await AnimesDAO.atualizar(req.params.id, animes)

    if(result.erro){
        res.status(500).send('Erro ao tentar atualizar o anime')
    }

    res.status(201).send({mensagem: 'Anime alterado com sucesso'})
  }
}

module.exports = animeController