const db = require('../infra/db.js')

class AnimesDAO {
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

    static inserir(animes) {
        const query = 'INSERT INTO ANIMES (titulo, episodios, temporadas, status) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [animes.titulo, animes.episodios, animes.temporadas, animes.status], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao tentar inserir anime',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'O anime foi adicionado com suceso',
                    contentId: this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM ANIMES WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao tentar deletar anime',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Anime deletado com sucesso' })
          });
      });
    }

    static atualizar(id, animes) {
      const query = 'UPDATE ANIMES SET titulo = ?, episodios = ?, temporadas = ?, status = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [animes.titulo, animes.episodios, animes.temporadas, animes.status, id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao tentar atualizar anime',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Anime atualizado com sucesso' })
          });
      });
    }
}

module.exports = AnimesDAO;