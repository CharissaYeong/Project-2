import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ListGroup } from "react-bootstrap";
import { EntryContext } from '../pages/home';
import { debounce } from 'lodash';

function SearchEntry({...props}) {
  const [entries, setEntries] = useState([]);
  const [updated, setUpdated] = useContext(EntryContext);
  const { storyID } = props;

  const handleSearch = async (query, story_id) => {
    if (!story_id) {
      return
    } else {
      try {
        if (query === '') {
          const response = await axios.get(`http://localhost:3001/entries/${story_id}`);
          setEntries(response.data.allEntries);
        } else {
          const response = await axios.get(`http://localhost:3001/entries/content/${story_id}/${query}`);
          setEntries(response.data.allEntries);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const debouncedHandleSearch = debounce(handleSearch, 500);

  useEffect(() => {
    handleSearch('', storyID);
    }, [updated, storyID]);

  return (
    <div>
      <input type="text" placeholder="Search entries" onChange={(e) => debouncedHandleSearch(e.target.value, storyID)} />
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

