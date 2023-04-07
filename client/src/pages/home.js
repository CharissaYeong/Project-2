import React, { useEffect, useState, createContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './home.css';
import { Container, Tab, Tabs } from 'react-bootstrap'

import Navigation from "../components/navbar";
import StoryHome from "../components/storyhome";
import Entry from "../components/entry";
// import GetEntries from "../components/getplot";
import SearchEntry from "../components/entrysearch";
import UserEntry from "../components/userentry";
import axios from "axios";

export const EntryContext = createContext()

export default function Home() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [storyID, setStoryID] = useState("");
  const [updated, setUpdated] = useState(false);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${localStorage.getItem('userID')}`);
        const profile = response.data;
        setUsername(profile[0].username)
        setEmail(profile[0].email)
      } catch (error) {
        console.log(error.response.data)
      }
    };

    getUser()

  }, []);


  return (
    <EntryContext.Provider value={[updated, setUpdated]}>
      <Navigation />
      <main className="home_body">
        <Tabs
          defaultActiveKey="home"
          id="home_tabs"
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            <Container fluid className="story_home">
              <StoryHome storyID={setStoryID}/>
            </Container>
          </Tab>
          <Tab eventKey="characters" title="Characters">
            List of characters
          </Tab>
          <Tab eventKey="submit entries" title="Submit Entries">
            <Entry storyID={storyID} />
            <SearchEntry storyID={storyID} />
          </Tab>
          <Tab eventKey="your entries" title="Your Entries">
            <UserEntry storyID={storyID} />
          </Tab>
        </Tabs>
      </main>
    </ EntryContext.Provider>
  )

}