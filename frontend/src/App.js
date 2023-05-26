
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './signup/Signup';
import EmailConfirm from './emailConfirm/EmailConfirm';
import Login from './login/Login';
import Home from './homePage/Home';
import MarketPlace from './marketInventry/MarketPlace';
import Navbar from './navbar/Navbar';
import PrivateRoute from './context/PrivateRoute';




function App() {
  return (
  <>
  <Navbar/>
  <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path='/emailConfirm/:uuid' element={<EmailConfirm/>}/>
    <Route path='/homepage' element={
       <PrivateRoute>
        <Home/>
       </PrivateRoute>
    
    }/>
   
    <Route path='/marketplace' element={
      <PrivateRoute>
        <MarketPlace/>
      </PrivateRoute>
    
    } />
  </Routes>
  
  
  </>

  );
}

export default App;

