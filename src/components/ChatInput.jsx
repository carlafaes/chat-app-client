import React,{useState} from "react";
import Picker from 'emoji-picker-react';

export default function ChatInput(){

    return(
        <div>
            <form>
        
            <input type="text" placeholder="Escribe un mensaje..." />
            </form>
        </div>
    )
}