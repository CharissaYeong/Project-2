import React from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

// function App() {
//   return (
//       <React.Fragment>



//       </React.Fragment>
//   );

// }

// export default App;

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import { RiBookOpenFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';


function OffcanvasExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">
            <Stack direction="horizontal" gap={1}>
              <h1>
                I hate react
              </h1>
              <h1>
                <RiBookOpenFill />
              </h1>
            </Stack>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} sticky="top" className="mb-3">
          <Container fluid>
            {/* <Navbar.Brand href="#">Welcome 'Username'!</Navbar.Brand> */}
            <Stack direction="horizontal" gap={2}>
            <h3><FaUserCircle /></h3>
            <Navbar.Text>
            Welcome <a href="#login">Username</a>
          </Navbar.Text>
            </Stack>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      <Container fluid>
        <h4>Current Prompt:</h4>
        <h5>Write a 'Genre' story about 'Topic' with themes of 'Theme 1' and 'Theme 2'.</h5>
      </Container>

      <Container fluid>
        <h4>Title:</h4>
        <h5>Blah blah of the blah</h5>
      </Container>

      <Container fluid>
        <h5>Characters:</h5>
      </Container>
    </>
  );
}

export default OffcanvasExample;