// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Button, ListGroup } from "react-bootstrap";

// function SearchEntry() {
//   const [entries, setEntries] = useState([]);
//   const [latestEntry, setLatestEntry] = useState([]);

//   async function getEntries() {
//     try {
//       const response = await axios.get('http://localhost:3001/getplot');
//       const l_entry = response.data.latestEntry;
//       const entry = response.data.allEntries;
//       if (l_entry.datetime !== latestEntry.datetime) {
//         setLatestEntry(l_entry);
//         setEntries(entry);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     getEntries();
//   }, []);

//   const handleSearch = async (query) => {
//     try {
//       if (query === '') {
//         getEntries();
//       } else {
//         const response = await axios.get(`http://localhost:3001/entries/content/${query}`);
//         // const l_entry = response.data.latestEntry;
//         // const entry = response.data.allEntries;
//           // setLatestEntry(response.data.latestEntry);
//           setEntries(response.data.allEntries);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <div>
//       <Button onClick={getEntries}>Refresh</Button>
//       <input type="text" placeholder="Search entries" onChange={(e) => handleSearch(e.target.value)} />
//       <ListGroup>
//         <h4>All entries</h4>
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

// export default SearchEntry;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, ListGroup } from "react-bootstrap";

function SearchEntry() {
  const [entries, setEntries] = useState([]);

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

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <div>
      {/* <Button onClick={() => handleSearch('')}>Refresh</Button> */}
      <input type="text" placeholder="Search entries" onChange={(e) => handleSearch(e.target.value)} />
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

