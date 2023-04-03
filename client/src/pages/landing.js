import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './landing.css';

import { Container, Row, Col } from 'react-bootstrap'

import Welcome from "../components/welcome"
import Auth from "../components/auth";
import 'animate.css';

export default function Landing() {
    return <>
        <Row className="lp_body">
            <Col lg={4} md={0} className="lp_img"></Col>
            <Col className="title_col">
                <Container fluid className="title_container">
                        <Container fluid className="lp_welcome"><Welcome /></Container>
                        <div className="lp_logo">
                            <h1>Drabble.</h1>
                        </div>
                        <Container fluid className="btns">
                            <Auth view="Login" />
                            <Auth view="Register" />
                        </Container>
                </Container>
            </Col>
        </Row>
    </>

}

