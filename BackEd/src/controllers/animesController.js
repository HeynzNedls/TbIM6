const ContentsDAO = require('../DAO/AnimesDAO.js')

class contentsController {
  static rotas(app){
    app.get('/anime', contentsController.listar)
    app.post('/anime', contentsController.inserir)
    app.delete('/anime/id', contentsController.deletar)
    app.put('/anime/id', contentsController.atualizar)
  }

  static async listar(req, res){
    const conteudos = await ContentsDAO.listar()

    res.status(200).send(conteudos)
  }

  static async inserir(req, res){
    const conteudo = {
      titulo: req.body.titulo,
      episodios: req.body.episodios,
      temporadas: req.body.temporadas,
      status: req.body.status
    }

    const result = await ContentsDAO.inserir(conteudo)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.status(201).send(result)
  }

  static async deletar(req, res){
    const conteudo = await ContentsDAO.deletar(req.params.id)

    if(conteudo.erro){
        res.status(500).send('Erro ao tentar deletar anime')
    }

    res.status(204).send({mensagem: 'Anime removido sucesso'})
  }

  static async atualizar(req, res){
    const conteudo = {
      titulo: req.body.titulo,
      episodios: req.body.episodios,
      temporadas: req.body.temporadas,
      status: req.body.status
    }

    const result = await ContentsDAO.atualizar(req.params.id, conteudo)

    if(result.erro){
        res.status(500).send('Erro ao tentar atualizar anime')
    }

    res.status(201).send({mensagem: 'Anime atualizado com sucesso'})
  }
}

module.exports = contentsController