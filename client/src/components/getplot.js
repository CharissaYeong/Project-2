import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Stack } from "react-bootstrap";
import axios from "axios";

export default function GetEntries() {
  const [entries, setEntries] = useState([]);
  const [latestEntry, setLatestEntry] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getplot');
        const { entries, latestEntry } = response.data;
        setEntries(entries);
        setLatestEntry(latestEntry);
      } catch (error) {
        alert(error.response.data)
      }
    };
    
    fetchData();

    // set up interval to periodically fetch new entries
    const interval = setInterval(fetchData, 10000000000);

    // clean up interval on component unmount
    return () => clearInterval(interval);
  }, [latestEntry]);

  return (
    <div>
      {entries.map((entry) => (
        <div key={entry._id}>
          {/* <h2>{entry._id}</h2> */}
          {entry.username && entry.entries &&
            entry.entries.map((item) => (
              <div key={item._id}>
                <h6>{entry.username}</h6>
                {item.content}
                <div>
                  <Button variant="outline-primary" size="sm">
                    Like
                  </Button>
                  {item.likes}
                  <p>{item.datetime}</p>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
// Above confirm working
