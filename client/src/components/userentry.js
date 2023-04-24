import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ListGroup, Stack, Form } from "react-bootstrap";
import EditEntry from './editentry'
import { EntryContext } from '../pages/home';
import { debounce } from 'lodash';

function UserEntry({ ...props }) {
    const [entries, setEntries] = useState([]);
    const [updated, setUpdated] = useContext(EntryContext);
    const { storyID } = props;

    const handleSearch = async (query, story_id) => {
        if (!story_id) {
            return
        } else {
            try {
                if (query === '') {
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/entries/${story_id}/${localStorage.getItem('userID')}`);
                    setEntries(response.data.allEntries);
                } else {
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/entries/${story_id}/${localStorage.getItem('userID')}/${query}`);
                    setEntries(response.data.allEntries);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }


    const handleDelete = async (entryID) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_BASE_URL}/entries/delete/${localStorage.getItem('userID')}/${entryID}`);
                // setEntries(entries.filter(entry => entry._id !== entryID));
                setUpdated(!updated)
                alert('Entry has been deleted')
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
            <Form.Control type="text" placeholder="Search entries by user/id/type/content" className='search' 
            onChange={(e) => debouncedHandleSearch(e.target.value, storyID)} />
            <ListGroup>
            <h4 className='entry_header'>Your entries</h4>
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
                        <Stack direction='horizontal' gap={3}>
                            <EditEntry entryID={entry._id} />
                            <Button variant="dark" size="sm" onClick={() => handleDelete(entry._id)}>Delete</Button>
                        </Stack>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default UserEntry;