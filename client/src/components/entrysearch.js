import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { ListGroup, Stack, Form, Button } from "react-bootstrap";
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
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/entries/${story_id}`);
          setEntries(response.data.allEntries);
        } else {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/entries/content/${story_id}/${query}`);
          setEntries(response.data.allEntries);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const debouncedHandleSearch = debounce(handleSearch, 500);

  const handleLike = async (entryId) => {
    try {
      // Add the current user to the liked list for the entry
      await axios.post(`${process.env.REACT_APP_BASE_URL}/entries/${entryId}/like`, {userId: localStorage.getItem('userID')});
  
      // Get the updated number of likes for the entry
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/entries/${entryId}/likes/number/count`);
  
      // Update the entries state with the updated number of likes
      setEntries(entries => entries.map(entry => {
        if (entry._id === entryId) {
          return { ...entry, likes: response.data.likes };
        }
        return entry;
      }));
    } catch (error) {
      console.error(error);
      alert(error.response.data);
      // alert(JSON.stringify(error.response.data));
    }
  };

  useEffect(() => {
    handleSearch('', storyID);
    }, [updated, storyID]);

  return (
    <div>
      <Form.Control type="text" placeholder="Search entries by user/id/type/content"
      className='search'
       onChange={(e) => debouncedHandleSearch(e.target.value, storyID)} />
      <ListGroup>
        <h4 className='entry_header'>All entries</h4>
        {entries.map(entry => (
          <ListGroup.Item key={entry._id} className='entry_item'>
            <h6 className='entry_user'>{entry.username}</h6>
            <p className='text-muted'>Type: {entry.type}</p>
            <p>{entry.content}</p>
            <Stack direction="horizontal" gap={3}>
            <small className='text-muted'>id: {entry._id}</small>
            <small className='text-muted'>date: {entry.datetime}</small>
            </Stack>
            <p className='likes'>Likes: {entry.likes}</p>
            <hr></hr>
              <Button variant='dark' size='sm' onClick={() => handleLike(entry._id)}>Like</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default SearchEntry;