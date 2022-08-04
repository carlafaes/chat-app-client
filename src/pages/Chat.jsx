import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from '../utils/routes/APIRoutes';

//components
import Contact from '../components/Contact';

export default function Chat() {
const navigate=useNavigate();
const [contacts, setContacts]= useState([]);
const [currentUser, setCurrentUser]= useState
(undefined);
const [currenChat,setCurrentChat]=useState(undefined);

useEffect( () => {
    async function getInfoUser(){
        if (!localStorage.getItem('token-chatapp-user')) {
          navigate("/login");
        } else {
         let infoToken=await JSON.parse(localStorage.getItem('token-chatapp-user'));
         setCurrentUser(infoToken);
        }
    }
    getInfoUser();
}, []);

useEffect( () => {
    async function fetchData(){
        if (currentUser) {
            if (currentUser.isAvatarImageSet) {
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                setContacts(data.data);
            } else {
                navigate("/setAvatar");
            }
        }
    }
    fetchData();
}, [currentUser]);

console.log(currentUser,'currentUser')
console.log(contacts,'contacts');

const handleChatChange=(currenChat)=>{
    setCurrentChat(currenChat);
}
//console.log(currenChat,'chat')
    return(
        <div>
            <h1>Chat</h1>
            <Contact 
            contacts={contacts} 
            currentUser={currentUser}
            changeChat={handleChatChange}/>
        </div>
    )
}