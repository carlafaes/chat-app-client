import React from "react";

export default function Welcome({ currentUser }) {
    return (
        <div>
            {currentUser && (
                <div>
                    <h1>Welcome {currentUser.username}</h1>
                    <p>Selecciona un chat para comenzar a chatear!</p>
                </div>
            )}
        </div>
    );
}