import React, { useEffect, useState } from 'react'
import "./login.css" ;
import { Alert, Container, TextField, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
   const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: "",
      });
      const [alertMessage, setAlertMessage] = useState("");
      const [alertSeverity, setAlertSeverity] = useState("");
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(() => ({
          ...formData,
          [name]: value,
        }));
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (
              data.message ==
              "fill all the details"
            ) {
              setAlertMessage(data.message);
              setAlertSeverity("error");
            }
            if(data.message == "Invalid Credentials"){
                setAlertMessage(
                    "Invalid Credentials"
                  );
                  setAlertSeverity("info");
            }
            if(data.message == "Please confirm your email before logging in"){
                setAlertMessage(
                    "Please confirm your email before logging in"
                  );
                  setAlertSeverity("info");
            }
            if (data.message == "Login successful") {
              setAlertMessage(
                "Login successful."
              );
              setAlertSeverity("success");
              setFormData({
                name: "",
                email: "",
                password: "",
                rePassword: "",
              });
              navigate("/homepage")
            } 
            else {
              throw new Error("Signup failed");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      useEffect(() => {
        if (alertMessage) {
          const timer = setTimeout(() => {
            setAlertMessage("");
          }, 5000); 
    
          return () => clearTimeout(timer);
        }
      }, [alertMessage]);
  return (
    <div>
       <Container component="main" maxWidth="xs">
      {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
          {alertMessage}
        </Alert>
      )}
        <div className="formContainer">
          <Typography className="formText" component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
          
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText={
                formData.email.length > 0 &&
                !formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) ? (
                  <p style={{ color: "red" }}>Email not valid</p>
                ) : (
                  ""
                )
              }
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
           
            
            <Button type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Login
