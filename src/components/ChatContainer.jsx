import React,{useState, useEffect} from "react";
import axios from "axios";

//route
import { getAllMessagesRoute, sendMessageRoute } from "../utils/routes/APIRoutes";

//components
import ChatInput from "./ChatInput";
import Logout from "./Logout";

export default function ChatContainer({ currentUser,currentChat }) {
    const [messages, setMessages] = useState([]);

const getMessages= async ()=>{
    const response= await axios.post(getAllMessagesRoute, {
        from:currentUser._id,
        to:currentChat._id
    })
    setMessages(response.data);
}
    useEffect(()=>{
        getMessages();
    },[currentChat])

    const handleSendMsg=async (msg)=>{
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
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
                <ChatInput handleSendMsg={handleSendMsg}/>
                <Logout/>
            </div>
        )}
    </div>
  );
}