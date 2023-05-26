import React, { Children, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Appcontext'

const PrivateRoute = ({children}) => {
    const { isLogin } = useContext(AuthContext) ;
    if(!isLogin){
        return <Navigate to="/"/>
    }
  return children ;
  
}

export default PrivateRoute
