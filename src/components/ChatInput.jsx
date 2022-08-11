import React,{useState} from "react";
import Picker from 'emoji-picker-react';

export default function ChatInput({ handleSendMsg }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPicker = (e) => {
        e.preventDefault()
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (e, emoji) => {
        let message= msg;
        message += emoji.emoji;
        setMsg(message);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(msg.length > 0){
            handleSendMsg(msg);
            setMsg('');
        }
    }
    return(
        <div>
            <div className="emoji-picker">
            </div>
            <form onSubmit={handleSubmit}>

                <button onClick={handleEmojiPicker}>
                    Emoji
                    {showEmojiPicker 
                    &&
                     <Picker onEmojiClick={handleEmojiClick}/>}
                </button>
            <input 
            type="text" 
            placeholder="Escribe un mensaje..."
            value={msg}
            onChange= {(e)=> setMsg(e.target.value)} 
            />
            <button type="submit" class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                Enviar
            </button>
            </form>
        </div>
    )
}