const db = require ("../infra/db");

// Essa classe encapsula o acesso ao Banco de Dados.
class AnimesDAO {

    // GET  --  Função ALL - Retorna todas as linhas.
    static listar() {
        const query = 'SELECT * FROM ANIMES';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows)
            });
        });
    }

    // POST  --  Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR, porém devolvemos ao usuário.
    static inserir(anime) {
        const query = 'INSERT INTO ANIMES (titulo, total_de_episodeos, epassistidos, temporada) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [anime.titulo, anime.total_de_episodeos, anime.epassistidos, anime.temporada], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao inserir o Anime",
                        erro: err,
                    });
                }
                resolve(anime);
            });
        });
    }

    // DELETE -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS e nem ROW. Existe apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Book deletado com sucesso" }
    static deletar(id) {
        const query = 'DELETE FROM animes WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao deletar o Anime",
                        erro: err
                    });
                }
                resolve({ mensagem: "Anime deletado com sucesso", id: id })
            });
        });
    }
    
    // PUT -- Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Book atualizado com sucesso" }
    static atualizar(id, anime) {
        const query = 'UPDATE ANIMES SET titulo = ?, total_de_episodeos = ?, epassistidos = ?, temporada = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [anime.titulo, anime.total_de_episodeos, anime.epassistidos, anime.temporada, id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao atualizar o Anime",
                        erro: err,
                    });
                }
                resolve({ mensagem: "Anime atualizado com sucesso" });
            });
        });
    }

}

module.exports = AnimesDAO