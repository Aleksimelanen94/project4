import React, { useState, useEffect } from "react";
import './styles.css'
const App = ()=> {
    const[User, setUsers] = useState([])
    const[variable,setVariable] = useState([])

    const UserPrint = (props)=>{
        return (
            <>
                <h1>{props.username}</h1>
                <p>{props.password}</p>
            </>
        )
    }

    const handleChange = (props) =>{
        console.log(props.target.value);
        setVariable(props.target.value);
    } 

    useEffect(() => {
        let UserCopy = [...User]
        UserCopy = UserCopy.filter(data => data.username.includes(variable))
        setUsers(UserCopy)
    }, [variable])

    const getData = () => {
        fetch("http://localhost:8080/api/getall")
        .then((result) => {
            console.log(result)
            return result.json();
    })
        .then((data) => {
            console.log(data)
            setUsers(data)
    });
} 
    return (
        <> 
            <div>
                <h1>User List</h1>
                <form>
                    <label>Search: </label> 
                    <input value={variable} type="text" onChange={handleChange}/>
                </form>
                {
                    User?
                    User.map((data,index) => <UserPrint key={index} username={data.username}   birthday={data.password} />) 
                    : <div>No Users found. Fething data...</div>
                }
                <button onClick={getData}>Get Data</button>
            </div>
        </>
    )
}
export default App;
