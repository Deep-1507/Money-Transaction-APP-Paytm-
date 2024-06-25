import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Users(){

    const [users, setUsers]=useState([]);
    const [filter, setFilter]=useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return <div>
        
        <div>
            Users
        </div>

        <div>
            <input type="text" placeholder="Search users...." onChange={(e) => {
                setFilter(e.target.value)
            }} />
        </div>

        <div>
             {users.map(user => <User user={user}/> )} 
        </div>
       
    </div>
}

function User({user}){

    const navigate = useNavigate();
    
    return <div className="flex justify-between">
        <div>
            <div>{user.firstName[0]}</div>
            <div>{user.firstName} {user.lastName}</div>
        </div>
        <div>
            <Button label={"Send Money"} onClick={(e) => {
                navigate("/send>id=" +user._id + "&name" + user.firstName);
            }}/>
        </div>
    </div>
}