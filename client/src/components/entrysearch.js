import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ListGroup } from "react-bootstrap";
import { EntryContext } from '../pages/home';
import { debounce } from 'lodash';

function SearchEntry() {
  const [entries, setEntries] = useState([]);
  const [updated, setUpdated] = useContext(EntryContext);

  const handleSearch = async (query) => {
    try {
      if (query === '') {
        const response = await axios.get('http://localhost:3001/getplot');
        setEntries(response.data.allEntries);
      } else {
        const response = await axios.get(`http://localhost:3001/entries/content/${query}`);
        setEntries(response.data.allEntries);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    handleSearch('');
    }, [updated]);

  return (
    <div>
      {/* <Button onClick={() => handleSearch('')}>Refresh</Button> */}
      <input type="text" placeholder="Search entries" onChange={(e) => debouncedHandleSearch(e.target.value)} />
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

export default SearchEntry;

