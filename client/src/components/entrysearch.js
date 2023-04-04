import React, { useState } from 'react';
import axios from 'axios';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.get(`/search/${query}`);
        setResults(response.data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            {results.map((result) => (
                <div key={result._id.$oid}>
                    <p>{result.entries[0].content}</p>
                </div>
            ))}
        </div>
    );
}

export default Search;
