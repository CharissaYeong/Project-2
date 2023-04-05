import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Offcanvas } from 'react-bootstrap';
import Newplot from './newplot';

export default function Entry({ name, ...props }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  name = 'New Plot'

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Newplot />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

