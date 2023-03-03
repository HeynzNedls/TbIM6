import { Modal, Button, Form } from 'react-bootstrap'

function CreateModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
    
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.createAnime(event)
        }}>

        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Inserir Anime</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="titulo">
            <Form.Label>
              Título
            </Form.Label>
            <Form.Control type="varchar" />
          </Form.Group>

          <Form.Group controlId="total_de_episodeos">
            <Form.Label>
            Total de episodeos
            </Form.Label>
            <Form.Control type="integer" />
          </Form.Group>

          <Form.Group controlId="epassistidos">
            <Form.Label>
            Assistidos
            </Form.Label>
            <Form.Control type="integer" />
          </Form.Group>

          <Form.Group controlId="temporada">
            <Form.Label>
            Temporada
            </Form.Label>
            <Form.Control type="varchar" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Fexar</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>

        </Form>
      </Modal >
    </div>
  )
}

export default CreateModal
