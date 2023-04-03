import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './home.css';
import {Row, Col, Container, Card, Image, Tab, Tabs} from 'react-bootstrap'
import Navigation from "../components/navbar";
import StoryHome from "../components/storyhome";
import Entry from "../components/entry";
import GetEntries from "../components/getplot";

export default function Home() {
  const [userID, setuserID] = useState("");
  const [storyID, setstoryID] = useState("");


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
        <GetEntries />
      </Tab>
    </Tabs>
    </main>
    </>
    )

}