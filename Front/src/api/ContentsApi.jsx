const ContentsApi = () => {
  const url = 'http://localhost:6808'

  return {
      getContents () {
          return fetch(`${url}/anime`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      },
      deleteContent (contentId) {
        return fetch(`${url}/anime/id/${contentId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
       })
      },
      createContent (titulo, episodios, temporadas, status) {
        return fetch(`${url}/anime`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              episodios: episodios,
              temporadas: temporadas,
              status: status
            }
          )
       })
      },
      updateContent(contentId, titulo, episodios, temporadas, status) {
        return fetch(`${url}/anime/id/${contentId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              episodios: episodios,
              temporadas: temporadas,
              status: status
            }
          )
       })
      },
  }
}

export default ContentsApi