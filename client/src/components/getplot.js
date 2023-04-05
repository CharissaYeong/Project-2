import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ListGroup } from "react-bootstrap";

function GetEntries() {
  const [entries, setEntries] = useState([]);
  const [latestEntry, setLatestEntry] = useState([])

  async function Entry() {
    try {
      const response = await axios.get('http://localhost:3001/getplot');
      const l_entry = response.data.latestEntry
      const entry = response.data.allEntries
      if (l_entry.datetime > latestEntry.datetime) {
        setLatestEntry(l_entry)
        setEntries(entry)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getplot')
        if (response.data.latestEntry._id !== latestEntry._id) {
          setLatestEntry(response.data.latestEntry);
          setEntries(response.data.allEntries);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEntries();
  }, [latestEntry]);


  // Entry()

  return (
    <div>
      <Button onClick={Entry}>Refresh</Button>
      <ListGroup>
        <h4>All entries</h4>
        {entries.map(entry => (
          <ListGroup.Item key={entry._id}>
            <h6>{entry.username}</h6>
            <p>Type: {entry.type}</p>
            <p>{entry.content}</p>
            <p>{entry.datetime}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
        }
export default GetEntries;
