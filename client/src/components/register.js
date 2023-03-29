import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Register_form from './register_form';
import { Button, Form, Modal } from 'react-bootstrap';
import Login_form from './login_form';

export default function Register(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [fullscreen, setFullscreen] = useState(true);

  // function handleShow(breakpoint) {
  //   setFullscreen('sm-down');
  //   setShow(true);
  // }

  const view = props.view

  function select_view(view) {
    if (view == "Register") {
      return <Register_form />
    } else if (view == 'Login') {
      return <Login_form />
    }
  }

  return (
    <>
      <Button variant="outline-dark" size="lg" onClick={handleShow} className="register_btn">
        {view}
      </Button>
      <Modal show={show} onHide={handleClose} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>{view}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {select_view(view)}
        </Modal.Body>
      </Modal>
    </>
  );
}
