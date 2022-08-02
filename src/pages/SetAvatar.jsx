import React,{useEffect, useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/routes/APIRoutes";
import { api } from "../utils/avatarsAPI/avatarsAPI";


export default function SetAvatar() {
    const navigate= useNavigate();
    const [avatar, setAvatar]= useState([]);
    const [avatarSelected, setAvatarSelected]= useState(undefined);
    const [loading, setLoading] = useState(false);

    console.log(avatar,'data avatar');

    const getInfoAv=async () => {
        const data=[];
        console.log(data,'data');
        let i=0;
        do {
            const image=  await axios.get(api);
            const buffer= new Buffer(image.data); //convertir la imagen a buffer
            const base64= buffer.toString('base64');//convertir el buffer a base64
            data.push(base64);
            setAvatar(data);
            i++;
        } while (i < 5); 
    }
    
    useEffect(()=>{
        getInfoAv();
    }, []);

  return(
    <div className="container">
        <p>Elige tu avatar</p>
    </div>
  );
}