// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Button, ListGroup } from "react-bootstrap";

// function UserEntry() {
//   const [entries, setEntries] = useState([]);

//   const handleSearch = async (query) => {
//     try {
//       if (query === '') {
//         const response = await axios.get(`http://localhost:3001/entries/${localStorage.getItem('userID')}`);
//         setEntries(response.data.allEntries);
//       } else {
//         // setEntries([])
//         const response = await axios.get(`http://localhost:3001/entries/${localStorage.getItem('userID')}/${query}`);
//         setEntries(response.data.allEntries);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     handleSearch('');
//     }, []);

//   return (
//     <div>
//       {/* <Button onClick={() => handleSearch('')}>Refresh</Button> */}
//       <input type="text" placeholder="Search entries" onChange={(e) => handleSearch(e.target.value)} />
//       <ListGroup>
//         <h4>Your Entries</h4>
//         {entries.map(entry => (
//           <ListGroup.Item key={entry._id}>
//             <h6>{entry.username}</h6>
//             <p>Type: {entry.type}</p>
//             <p>{entry.content}</p>
//             <p>{entry.datetime}</p>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </div>
//   );
// }

// export default UserEntry;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ListGroup, Stack } from "react-bootstrap";
import EditEntry from './editentry';

function UserEntry() {
    const [entries, setEntries] = useState([]);
    // const [entryID, setEntryID] = useState("")
    const [updated, setUpdated] = useState(false);

    const handleSearch = async (query) => {
        try {
            if (query === '') {
                const response = await axios.get(`http://localhost:3001/entries/${localStorage.getItem('userID')}`);
                setEntries(response.data.allEntries);
            } else {
                // setEntries([])
                const response = await axios.get(`http://localhost:3001/entries/${localStorage.getItem('userID')}/${query}`);
                setEntries(response.data.allEntries);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (entryID) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            try {
                await axios.delete(`http://localhost:3001/entries/delete/${localStorage.getItem('userID')}/${entryID}`);
                setEntries(entries.filter(entry => entry._id !== entryID));
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        handleSearch('');
    }, [updated]);

    return (
        <div>
            {/* <Button onClick={() => handleSearch('')}>Refresh</Button> */}
            <input type="text" placeholder="Search entries" onChange={(e) => handleSearch(e.target.value)} />
            <ListGroup>
                <h4>Your Entries</h4>
                {entries.map(entry => (
                    <ListGroup.Item key={entry._id}>
                        <h6>{entry.username}</h6>
                        <p>Type: {entry.type}</p>
                        <p>{entry.content}</p>
                        <p>{entry.datetime}</p>
                        <Stack direction='horizontal' gap={3}>
                        <EditEntry entryID={entry._id} setUpdated={setUpdated} />
                            <Button onClick={() => handleDelete(entry._id)}>Delete</Button>
                        </Stack>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default UserEntry;