import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { Users } from '../../types';

interface ModalCreateUserProps {
    show: boolean
    onHide: ()=> void
    createUser: (users: Omit<Users, 'id'>) => void
}


const ModalCreateUser: React.FC<ModalCreateUserProps> = ({show, onHide, createUser}) => {
    const formik = useFormik({
        initialValues: {
          name: '',
          age: 0
        },
        onSubmit: values => {
          createUser({
            name: values.name,
            age: values.age
          })
          onHide()
        }
      })
    return (
    <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Criar Usuario</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-5">
          <Form.Label>Nome</Form.Label>
          <Form.Control id="name" type="text" placeholder="Nome completo" value={formik.values.name} onChange={formik.handleChange}/>
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>Idade</Form.Label>
          <Form.Control id="age" type="number" placeholder="Sua idade" value={formik.values.age} onChange={formik.handleChange}/>
        </Form.Group>
        <Form.Group>
          <Button variant="success" type="submit" style={{marginRight: 15}}>Salvar</Button>
          <Button variant="danger" onClick={formik.handleReset}>Resetar</Button>
        </Form.Group>
      </Form>
    </Modal.Body>
  </Modal>
  );
}

export default ModalCreateUser;