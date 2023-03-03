const db = require('../infra/db.js')

class ContentsDAO {
    static listar() {
        const query = 'SELECT * FROM conteudos';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(conteudo) {
        const query = 'INSERT INTO conteudos (titulo, episodios, temporadas, status) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [conteudo.titulo, conteudo.episodios, conteudo.temporadas, conteudo.status], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao tentar inserir o Anime',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'Anime inserido com sucesso',
                    contentId: this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM conteudos WHERE id = ?';
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

    static atualizar(id, conteudo) {
      const query = 'UPDATE conteudos SET titulo = ?, episodios = ?, temporadas = ?, status = ? WHERE id = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [conteudo.titulo, conteudo.episodios, conteudo.temporadas, conteudo.status, id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao tentar atualizar a serie',
                      erro: err
                  })
              }

              resolve({ mensagem: 'Anime atualizada com sucesso' })
          });
      });
    }
}

module.exports = ContentsDAO;