import React,{useState,useEffect, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

//utils
import { allUsersRoute,host } from '../utils/routes/APIRoutes';

//components
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

export default function Chat() {
const socket= useRef();
const navigate=useNavigate();
const [contacts, setContacts]= useState([]);
const [currentUser, setCurrentUser]= useState
(undefined);
const [currentChat,setCurrentChat]=useState(undefined);
console.log(currentChat,'currenChat')

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

useEffect(() => {
    if(currentUser){
        socket.current=io(host);
        socket.current.on('connect', () => {
            console.log('connected');
        } );
        socket.current.on('disconnect', () => {
            console.log('disconnected');
        } );

        socket.current.emit('add-user', currentUser._id);
        
    }
} ,[currentUser]);

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

//console.log(currentUser,'currentUser')
console.log(contacts,'contacts');

const handleChatChange=(currentChat)=>{
    setCurrentChat(currentChat);
}
//console.log(currenChat,'chat')
    return(
        <div className='container mx-auto grid bg-gray-800  px-2'>
            <h1 className='text-center font-normal font-mono text-stone-400'>Chat</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
            <div className='bg-indigo-100 rounded-sm p-10'>      
            <Contact 
            contacts={contacts} 
            currentUser={currentUser}
            changeChat={handleChatChange}/>
            </div>

            <div className='bg-gray-400'>
            {currentChat === undefined ?
            
            <Welcome 
            currentUser={currentUser}
            />
            :
            <ChatContainer  
            currentUser={currentUser} currentChat={currentChat} 
            socket={socket}
            />
            }
            </div>
            </div>
        </div>
    )
}