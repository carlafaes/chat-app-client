import React from "react";
import ChatInput from "./ChatInput";
import Logout from "./Logout";

export default function ChatContainer({ currentUser,currentChat }) {

    const handleSendMsg=(msg)=>{
        
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