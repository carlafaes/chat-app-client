import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/routes/APIRoutes";
//utils
import { api } from "../utils/avatarsAPI/avatarsAPI";
import loader from '../utils/avatarsAPI/loader.gif'
import { messageError, message, toastOptions } from "../utils/messagesToast/messages";



export default function SetAvatar() {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState([]);
    const [avatarSelected, setAvatarSelected] = useState(undefined);
    console.log(avatarSelected, 'avatar elegido');
    const [loading, setLoading] = useState(true);

    console.log(avatar, 'data avatar');

    const getInfoAv = async () => {
        const data = [];
        console.log(data, 'data');
        let i = 0;
        do {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 100)}`);
            const buffer = new Buffer(image.data); //convertir la imagen a buffer
            const base64 = buffer.toString('base64');//convertir el buffer a base64
            data.push(base64);
            setAvatar(data);
            i++;
        } while (i < 4);
        setLoading(false);
    }

    const setProfilePicture = async () => {
        if (avatarSelected === undefined) {
            toast.error('Primero tienes que seleccionar un avatar', toastOptions)
        }
        else{
            const user= await JSON.parse(localStorage.getItem('token-chatapp-user'));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: setAvatarSelected(avatarSelected),
            })
            console.log(data,'data avatar[selected]')
            if(data.isSet){
                user.isAvatarImageSet= true;
                user.avatarImage = data.image;
                localStorage.setItem('token-chatapp-user', JSON.stringify(user))
                console.log(data,'data',user,':user')
                toast.success('Avatar cambiado con exito', toastOptions)
                navigate('/');

            }
            else{
                toast.error("Ha ocurrido un error. Por favor, intenta nuevamente.")
            }
            

        }
    }
    useEffect( () => {
        if(!localStorage.getItem('token-chatapp-user')){
            navigate('/login');
        }
    },[])
    useEffect(() => {
        getInfoAv();

    }, []);

    return (
        <>
            {loading ?
                <div className="container">
                    <img src={loader} alt="loader" />
                </div>
                :
                <div className="container">
                    <p>Elige tu avatar</p>
                    <div>
                        {avatar.length > 1 &&
                            avatar.map((avatar, index) => {
                                return (
                                    <div key={index} className={`avatar ${avatarSelected === index ? "selected" : ""}`}>
                                        <img 
                                        src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" 
                                        onClick={() => { setAvatarSelected(index) }} width='50' 
                                        height='50'
                                        key={avatar} />
                                    </div>
                                )

                            })
                        }
                    </div>
                    <div>
                        <button onClick={setProfilePicture}>
                            Establecer avatar
                        </button>
                    </div>
                </div>
            }
            <ToastContainer
                theme='dark'
            />
        </>
    );
}