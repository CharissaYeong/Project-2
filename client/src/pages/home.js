import React, { useEffect, useState, createContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './home.css';
import { Container, Tab, Tabs, Stack} from 'react-bootstrap'

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
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${localStorage.getItem('userID')}`);
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
      <Navigation username={username}/>
      <main className="home_body">
        <Tabs
          defaultActiveKey="home"
          id="home_tabs"
          className="mb-3"
        >
          <Tab eventKey="home" title="Home" className="tabnav">
            <Container fluid className="story_home">
              <StoryHome storyID={setStoryID}/>
            </Container>
          </Tab>
          <Tab eventKey="submit entries" title="Submit Entries" className="tabnavsub">
            <Stack gap={3}>
            <Entry storyID={storyID} />
            <SearchEntry storyID={storyID} />
            </Stack>
          </Tab>
          <Tab eventKey="your entries" title="Your Entries" className="tabnav">
            <UserEntry storyID={storyID} />
          </Tab>
        </Tabs>
      </main>
    </ EntryContext.Provider>
  )

}