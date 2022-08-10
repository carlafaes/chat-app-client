import React, { useState, useEffect } from "react";
import axios from "axios";

//route
import { getAllMessagesRoute, sendMessageRoute } from "../utils/routes/APIRoutes";

//components
import ChatInput from "./ChatInput";
import Logout from "./Logout";

//styles
import s from '../styles/chatContainer.module.css';


export default function ChatContainer({ currentUser, currentChat }) {
    const [messages, setMessages] = useState([]);


    useEffect(() => {
       
        const getMessages = async () => {
            const data = await JSON.parse(
                localStorage.getItem('token-chatapp-user')
              );
            const response = await axios.post(getAllMessagesRoute, {
                from: data._id,
                to: currentChat._id
            })
            console.log(response, 'response')
            setMessages(response.data);
        }
        getMessages();
        if(messages.length > 0){
        }
        
    }, [currentChat])
    
    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        console.log(msg, 'message')
    }

    return (
        <div>
            <h1>Chat</h1>
            {currentChat && (
                <div>
                    <h1>{currentChat.username}</h1>
                    <div>
                        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt='img_perfil_cht' width='30' height='30' />
                    </div>
                    <div>
                        {messages && messages.map((msg, index) => {
                            return (
                                <div key={index} className={`message ${msg.fromSelf ? s.sended : s.recieved}`}>
                                    <p>
                                        {/* {msg.from === currentUser._id ? "You" : currentChat.username} */}
                                        {msg.message}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <ChatInput handleSendMsg={handleSendMsg} />
                    <Logout />

                </div>
            )}
        </div>
    );
}