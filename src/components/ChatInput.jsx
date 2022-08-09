import React,{useState} from "react";
import Picker from 'emoji-picker-react';

export default function ChatInput(){
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    return(
        <div>
            <div className="emoji-picker">
                <button onClick={handleEmojiPicker}>
                    Emoji{showEmojiPicker && <Picker/>}
                </button>
            </div>
            <form>

            <input type="text" placeholder="Escribe un mensaje..." />
            </form>
        </div>
    )
}