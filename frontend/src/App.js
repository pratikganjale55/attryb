
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './signup/Signup';
import EmailConfirm from './emailConfirm/EmailConfirm';
import Login from './login/Login';
import Home from './homePage/Home';




function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/emailConfirm/:uuid' element={<EmailConfirm/>}/>
    <Route path='/homepage' element={<Home/>}/>
  </Routes>
  
  
  </>

  );
}

export default App;

