import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ currentUser }) {
const navigate=useNavigate();
const handleClick=()=>{
    localStorage.removeItem('token-chatapp-user');
    navigate("/login");
}
    return(
        <div>
        <button onClick={handleClick}>Logout</button>
        </div>
    )
}