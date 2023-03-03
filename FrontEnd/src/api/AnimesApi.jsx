const AnimesApi = () => {
    const url = 'http://localhost:1585'
  
    return {
        getAnimes () {
            return fetch(`${url}/anime`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        deleteAnime (animeId) {
          return fetch(`${url}/anime/${animeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
         })
        },
        createAnime (titulo, total_de_episodeos, epassistidos, temporada) {
          return fetch(`${url}/anime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                titulo: titulo,
                total_de_episodeos: total_de_episodeos,
                epassistidos: epassistidos,
                temporada: temporada
              }
            )
         })
        },
        updateAnime(animeId, titulo, total_de_episodeos, epassistidos, temporada) {
          return fetch(`${url}/anime/${animeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                titulo: titulo,
                total_de_episodeos: total_de_episodeos,
                epassistidos: epassistidos,
                temporada: temporada
              }
            )
         })
        },
    }
  }
  
  export default AnimesApi