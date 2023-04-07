import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ListGroup, Stack } from "react-bootstrap";
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
                    const response = await axios.get(`http://localhost:3001/entries/${story_id}/${localStorage.getItem('userID')}`);
                    setEntries(response.data.allEntries);
                } else {
                    const response = await axios.get(`http://localhost:3001/entries/${story_id}/${localStorage.getItem('userID')}/${query}`);
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
                await axios.delete(`http://localhost:3001/entries/delete/${localStorage.getItem('userID')}/${entryID}`);
                // setEntries(entries.filter(entry => entry._id !== entryID));
                setUpdated(!updated)
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
            {/* <Button onClick={() => handleSearch('')}>Refresh</Button> */}
            <input type="text" placeholder="Search entries" onChange={(e) => debouncedHandleSearch(e.target.value, storyID)} />
            <ListGroup>
                <h4>Your Entries</h4>
                {entries.map(entry => (
                    <ListGroup.Item key={entry._id}>
                        <h6>{entry.username}</h6>
                        <p>Type: {entry.type}</p>
                        <p>{entry.content}</p>
                        <p>{entry.datetime}</p>
                        <Stack direction='horizontal' gap={3}>
                            {/* <EditEntry entryID={entry._id} setUpdated={setUpdated} /> */}
                            <EditEntry entryID={entry._id} />
                            <Button onClick={() => handleDelete(entry._id)}>Delete</Button>
                        </Stack>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default UserEntry;