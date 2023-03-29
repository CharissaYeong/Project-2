import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './home.css';
import Navigation from "../components/navbar";

import {Row, Col} from 'react-bootstrap'

export default function Home() {
  return (
    <>
    <Navigation />
    <Row className="home_body">
      hello
    </Row>
    </>
    )

}