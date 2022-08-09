import React from "react";

export default function ChatContainer({ currentUser,currentChat }) {

  return (
    <div>
      <h1>Chat</h1>
        {currentChat && (
            <div>
                <h1>{currentChat.username}</h1>
            </div>
        )}
    </div>
  );
}