import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';

import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas, Stack} from 'react-bootstrap'

import { FaUserCircle } from 'react-icons/fa';

export default function Navigation() {
  return (
    <>
      {/* <style>
        {
          `h1 {
              font-family: 'Fredericka the Great', cursive; 
              font-size: 2rem;
              padding: 0.5rem;
              border-top: 3px double white;
              border-bottom: 3px double white;
            }
            .navbar-toggler-icon{
              background-image: url('https://api.iconify.design/material-symbols/menu-book.svg') !important;
              background-size: contain;
              background-repeat: no-repeat;
            }
            .logo_body {
              background-color: navy;
            }
            #offcanvasNavbar-expand-md {
              width: 80vw
            }`
        }
      </style> */}

      <Navbar variant="dark" className="logo_body">
        <Container fluid>
          <Navbar.Brand href="#home" className="nav_logo">
              <h1>
                Drabble.
              </h1>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {
        ['md'].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} sticky="top" className="nav_body">
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
        ))
      }
    </>
  )
}