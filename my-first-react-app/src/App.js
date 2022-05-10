import React, { useState} from "react";
import Button from '@mui/material/Button';
import './styles.css'
const App = ()=> {

    const UserPrint = (props)=>{
        const data = {props}
        return (
            <>
                <h1>{data.username}</h1>
                <p>{data.password}</p>
                <p>{data.birthday}</p>
            </>
        )
    }

    const [query, setQuery] = useState('')
    // Define first button handler
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("This happend: ", event.target);
        console.log("id: ", query);
        getData();
    };

    const [results, setResults] = useState([])

    const getData = () => {
        fetch("http://localhost:8080/api/getall")
        .then((results) => {
            return results.json();
        })
            .then((data) => {
                console.log(data);
                const items = data;
                setResults(items)
            });
};
    return (
        <> 
            <div>
                <h1>User List</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Search by id: </label>
                        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Set id " name="query"/>
                    </div>
                    <div>
                        <label>Search by username: </label>
                        <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Username " name="query"/>
                    </div>
                    <div>
                        <Button variant="contained" type="submit">Submit</Button>
                    </div>
            </form>
                <div>
                {
                    <UserPrint data ={results}/>
                }
                </div>
                <Button variant="contained" onClick={getData}>Get all Data</Button>
            </div>
        </>
    )
}
export default App;
