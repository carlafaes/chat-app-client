import React from 'react';
import './App.css';
import {Route,Routes} from 'react-router-dom';

//components
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Chat/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/setAvatar" element={<SetAvatar/>}/>
     </Routes>
    </div>
  );
}

export default App;
