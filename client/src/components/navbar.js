import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom'
// import { useCookies } from "react-cookie";
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas, Stack} from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa';

export default function Navigation(props) {
// const [cookies, setCookies] = useCookies(["access_token"])
const navigate = useNavigate()
const username = props.username



const logout = () => {
  // setCookies("access_token", "");
  window.localStorage.removeItem("userID");
  navigate("/")
}

  return (
    <>
      <Navbar variant="light" className="logo_body">
        <Container fluid className="nav_brand">
        <Link to="/Home"><div className="nav_logo">
              <h1>Drabble.</h1>
          </div></Link>
        </Container>
      </Navbar>

      {
        ['md'].map((expand) => (
          <Navbar key={expand} variant="light" expand={expand} className="nav_body">
            <Container fluid>
              <Stack direction="horizontal" gap={2}>
                <h3><FaUserCircle /></h3>
                <Navbar.Text>
                  Welcome <Link to="/Home">{username}</Link>
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
                  <Link to="/Home" className="nav-link">Your Entries</Link>
                  <Link to="/Home" className="nav-link">Account</Link>
                  <hr></hr>
                  <Button variant="dark" size="sm" onClick={logout} className="nav_btn logout">Log out</Button>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))
      }
    </>
  )
}