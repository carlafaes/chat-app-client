import './App.css';
import {Route,Routes} from 'react-router-dom';

//components
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
     </Routes>
    </div>
  );
}

export default App;
