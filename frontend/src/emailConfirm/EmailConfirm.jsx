import React, { useEffect } from "react";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { Button, Paper } from "@mui/material";
import "./emailConfirm.css";
import { Link, useParams } from "react-router-dom";
const EmailConfirm = () => {

    const {uuid} = useParams() 
   
    useEffect(() => {
        fetch(`http://localhost:8080/auth/emailConfirm/${uuid}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.error(error);
          });

    }, [uuid])
  return (
    <div className="emailConfirmDiv">
      <Paper elevation={4}>
        <div className="emailConfirm_flex">
          <div>
            {" "}
            <GppGoodIcon sx={{ fontSize: 120 }} className="custom-icon" />
          </div>
          <div>
            <h2>Congratulations!</h2>
            Your email has been successfully verified.<br/> Thank you for joining
            Attryb <br/> You can now log in and start using our
            platform <br/><br/>
            <Link to="/login">
            <Button variant="contained" color="secondary">Login</Button>
            </Link>
            
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default EmailConfirm;
