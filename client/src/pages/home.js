import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './home.css';
import {Row, Col, Container, Card, Image, Tab, Tabs} from 'react-bootstrap'
import Navigation from "../components/navbar";
import StoryHome from "../components/storyhome";
import Entry from "../components/entry";

export default function Home() {
  const [storyID, setStoryID] = useState("");
  const [objectID, setobjectID] = useState("");


  return (
    <>
    <Navigation />
    <main className="home_body">
    <Tabs
      defaultActiveKey="home"
      id="home_tabs"
      className="mb-3"
      sticky="top"
    >
      <Tab eventKey="home" title="Home">
        <Container fluid className="story_home">
        <StoryHome />
        </Container>
      </Tab>
      <Tab eventKey="characters" title="Characters">
        List of characters
      </Tab>
      <Tab eventKey="entries" title="View / Submit Entries">
        <Entry />
      </Tab>
    </Tabs>
    </main>
    </>
    )

}