const AnimesDAO = require ('../DAO/AnimesDAO')

class animesController {
    static rotas(app){
        // Rotas para os recursos books. O endpoint das rotas aparece na primeira parte entre aspas. O que vem depois são os métodos que trabalharão com as requisições.
        app.get('/anime', booksController.listar)
        app.post('/anime', booksController.inserir)
        app.delete('/anime/:id', booksController.deletar)
        app.put('/anime/:id', booksController.atualizar)
    }

    // GET
    static async listar(req, res){
        const animes = await AnimeDAO.listar()
        
        // Devolve a lista de usuarios e o status code 200, quer dizer que a requisição foi bem sucedida.
        res.status(200).send(animes)
    }

    // POST
    static async inserir(req, res){
        const anime = {
            titulo: req.body.titulo,
            total_de_episodeos: req.body.total_de_episodeos,
            epassistidos: req.body.epassistidos,
            temporada: req.body.temporada
        }

        // Verifica se o corpo da requisição está sendo enviado com todas as chaves, se faltar alguma chave, entra no If e dá um status de requisição mal sucedida, dá um return encerrando a função.
        if(!anime || !anime.titulo || !anime.total_de_episodeos || !anime.epassistidos || !anime.temporada) {
            res.status(400).send("Precisa passar as informações")
            return
        }

        // Classe BooksDAO é chamada com o método inserir para adicionar o livro na tabela de books no banco e retorna o resultado da operação que é o próprio livro cadastrado
        const result = await AnimesDAO.inserir(anime)

        // Se o resultado retornado não for o livro que enviamos, ele trará a informação da chave erro. Esse retorno de erro tem ligação com uma funcão de conexão do próprio SQLite. Se entrar no If, dá um status code 500.        
        if(result.erro) {
            res.status(500).send(result)
        }

        // Se o cadastro ocorrer tudo OK, devolve o status code 201, que é o ideal para ROTAS POST, que quer dizer: Recurso Criado, ou seja, houve a cadastro de algo no banco. 
        // Abaixo a resposta personalizada que será mostrada, em caso de status 201. Além da mensagem, mostra também o objeto cadastrado
        res.status(201).send({"Mensagem": "Anime criado com sucesso", "Novo Anime: ": anime})
    }

    // DELETE
    static async deletar(req, res) {
        // Envia a constante id do usuário para BooksDAO.deletar.
        const anime = await AnimesDAO.deletar(req.params.id)

        // Se o livro não for encontrado, devolve um erro staus code 500.
        if(anime.erro){
            res.status(500).send({'Menssagem': 'Erro ao deletar o Anime'})
            return
        }

        res.status(200).send({mensagem: 'Anime removido com sucesso'})
    }

    // PUT --   Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Livro" atualizado com sucesso" }
    static async atualizar(req, res){
        const anime = {
            titulo: req.body.titulo,
            total_de_episodeos: req.body.total_de_episodeos,
            epassistidos: req.body.epassistidos,
            temporada: req.body.temporada
        }

        const result = await BooksDAO.atualizar(req.params.id, anime)

        if(result.erro){
            res.status(500).send('Erro ao atualizar o Anime')
            return
        }

        res.status(200).send({mensagem: 'Anime atualizado com sucesso', "Anime: ": anime})
    }
}

// Exportação da Classe "booksController"
module.exports = animesController