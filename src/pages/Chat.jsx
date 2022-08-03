import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
const navigate=useNavigate();
const [contacts, setContacts]= useState([]);
const [currentUser, setCurrentUser]= useState(undefined);

useEffect( async() => {
    if(!localStorage.getItem('token-chatapp-user')){
        navigate('/login');
    }
} ,[]);

useEffect( async() => {
    if(currentUser){
        if(currentUser.isAvatarImageSet){
            const data= await axios.get(`${allUsersRoute}/${currentUser.id}`);
            setContacts(data.data);
        }
        else{
            navigate('/setAvatar')
        }
    }
},[]);

    return(
        <div>
            <h1>Chat</h1>
        </div>
    )
}