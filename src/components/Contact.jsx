import React, { useEffect, useState } from "react";
import axios from "axios";
import { allUsersRoute } from '../utils/routes/APIRoutes';

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
            <h1 className="text-3xl font-bold ">Contact</h1>
            {currentUserImage && (
                <div p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4>
                    {contacts && contacts.map((contact, index) => {
                        return (
                            <div
                                key={index}
                                className={`contact ${index === currentSelected ? "selected" : ""}`}
                                onClick={() => changeCurrentChat(index, contact)}
                            >
                                <div>
                                    <img
                                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                        alt="avatar"
                                        width='50'
                                        height='50'
                                    /> 
                                </div>
                                <div>
                                    <h2>{contact.username}</h2>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    );
}