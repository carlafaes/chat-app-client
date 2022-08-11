import React, { useEffect, useState } from "react";
import axios from "axios";
import { allUsersRoute } from '../utils/routes/APIRoutes';

//styles
import s from '../styles/contact.module.css';

export default function Contact({ contacts, changeChat,currentUser }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(()=>{
        let data=null
        if(currentUser){
          data= currentUser;
         console.log(data,'data currentUSER')
        }
        if(data){
            setCurrentUserName(data.username);
            setCurrentUserImage(data.avatarImage);
            //currentInfoUser()
        }
        
     },[currentUser])
    // async function currentInfoUser(data){
    //     let dataInfo=data
    //     console.log(dataInfo,'dataInfo')
    //     if(dataInfo){
    //         setCurrentUserImage( await dataInfo.avatarImage);
    //         setCurrentUserName(await dataInfo.username);
    //     }
    //     else{
    //         setCurrentUserImage("");
    //         setCurrentUserName("");
    //     }
    // }

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    // console.log(currentSelected,'currentSelected Contact')
     //console.log(currentUserName,'currentUserName  Contact')
     //console.log(currentUserImage,'currentUserImage  Contact')

    return (
        <>
            <h1 className="text-center text-indigo-700">Contact</h1>
            {currentUserImage && (
                <div className="grid  gap-1 col-span-1 text-center bg-slate-900  p-4 max-w-sm mx-auto text-slate-400 rounded-xl shadow-lg space-x-2">
                    {contacts && contacts.map((contact, index) => {
                        return (
                            <div
                                key={index}
                                className={`contact ${index === currentSelected ? s.selected : s.chat }`}
                                onClick={() => changeCurrentChat(index, contact)}
                            >
                                <div >
                                    <img
                                    className="rounded-full h-12 w-12 shadow-lg"
                                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                        alt="avatar"
                                        
                                    /> 
                                </div>
                                <div>
                                    <h3 className="text-indigo-400 break-all">{contact.username}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    );
}