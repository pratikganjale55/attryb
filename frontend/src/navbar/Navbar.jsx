import React, { useContext } from "react";
import "./navbar.css";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Appcontext";


const Navbar = () => {
  const {logout} = useContext(AuthContext) ;
    const navigate = useNavigate()
    const handleInventry = () => {
        navigate("/marketplace")
    }
    const handleLogout = () => {
        logout()
    }
    const handleHomepage = () => {
        navigate("/homepage")
    }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="homeIcon" onClick={handleHomepage}>
              BUYC Corp
            </Typography>
            
              <Button color="inherit" className="inventryBtn" onClick={handleInventry}>
                Inventory
              </Button>
           

            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
