import { Table, Container, Button } from 'react-bootstrap'
import AnimesApi from './api/AnimesApi'
import { useEffect, useState } from 'react'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'

function App() {
  const [animes, setAnimes] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedAnime, setSelectedAnime] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await AnimesApi().getAnimes().then(data => {
        return data.json()
      })
      .then(data => {
        setAnimes(data)
      })
    }

    getData()
  }, [])

  async function createAnime(event) {
    try {
      event.preventDefault()
      const req = event.currentTarget.elements

      await AnimesApi().createAnime(
        req.titulo.value, Number(req.total_de_episodeos.value), Number(req.epassistidos.value), req.temporada.value
      ).then(data => {
        return data.json()
      }).then(res => {
        setAnimes([...animes, {
          id: res.animeId,
          titulo: req.titulo.value,
          total_de_episodeos: Number(req.total_de_episodeos.value),
          epassistidos: Number(req.epassistidos.value),
          temporada: req.temporada.value
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function deleteAnime(animeId) {
    try {
      await AnimesApi().deleteAnime(animeId)

      const formattedAnimes = animes.filter(cont => {
        if(cont.id !== animeId){
          return cont
        }
      })

      setAnimes(formattedAnimes)
    } catch(err) {
      throw err
    }
  }

  async function updateAnime(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await AnimesApi().updateAnime(
        selectedAnime.id, req.titulo.value, Number(req.total_de_episodeos.value), Number(req.epassistidos.value), req.temporada.value
      )

      const formattedAnimes = animes.map(cont => {
        if(cont.id === selectedAnime.id) {
          return {
            id: selectedAnime.id,
            titulo: req.titulo.value,
            total_de_episodeos: Number(req.total_de_episodeos.value),
            epassistidos: Number(req.epassistidos.value),
            temporada: req.temporada.value
          }
        }

        return cont
      })

      setAnimes(formattedAnimes)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return (
    <>
    <Container>
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Inserir Anime
      </Button>
       <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Total de episodeos</th>
            <th>Assitidos</th>
            <th>Temporada</th>
          </tr>
        </thead>

        <tbody>
          {animes && animes.map(cont => (
            <tr key={cont.id}>
              <td>{cont.titulo}</td>
              <td>{cont.total_de_episodeos}</td>
              <td>{cont.epassistidos}</td>
              <td>{cont.temporada}</td>
              <td>
                <Button onClick={() => deleteAnime(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedAnime(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
      <CreateModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createAnime={createAnime} />
      {selectedAnime && (
      <UpdateModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateAnime={updateAnime} anime={selectedAnime} />
    )}
    </>
  )
}

export default App
