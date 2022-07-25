import './App.css';
import {Route,Routes} from 'react-router-dom';

//components
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<Chat/>} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
     </Routes>
    </div>
  );
}

export default App;
