import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas, Stack} from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa';

export default function Navigation() {
const [cookies, setCookies] = useCookies(["access_token"])
const navigate = useNavigate()



const logout = () => {
  setCookies("access_token", "");
  window.localStorage.removeItem("userID");
  navigate("/")
}

  return (
    <>
      <Navbar variant="light" className="logo_body">
        <Container fluid>
        <Link to="/"><div className="nav_logo">
              <h1 className="nav_logo">Drabble.</h1>
          </div></Link>
        </Container>
      </Navbar>

      {
        ['md'].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} sticky="top" className="nav_body">
            <Container fluid>
              <Stack direction="horizontal" gap={2}>
                <h3><FaUserCircle /></h3>
                <Navbar.Text>
                  Welcome <Link to="/">Username</Link>
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
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to="/Home" className="nav-link">Current Story</Link>
                  <Link to="/Home" className="nav-link">Previous Stories</Link>
                  <Link to="/Home" className="nav-link">Your Entries</Link>
                  <Link to="/Home" className="nav-link">Account</Link>
                  
                    {/* <NavDropdown
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
                    </NavDropdown> */}
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
                  <Button variant="outline-primary" size="sm" onClick={logout}>Log out</Button>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))
      }
    </>
  )
}