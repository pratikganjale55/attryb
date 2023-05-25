import {
  Container,
  TextField,
  Typography,
  Button,
  Alert,
  Link,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./signup.css";

const Signup = () => {
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
    fetch("http://localhost:8080/auth/signup", {
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
          "Password must contain at least 8 characters, including at least 1 number, 1 lowercase letter, and 1 uppercase letter."
        ) {
          setAlertMessage(data.message);
          setAlertSeverity("error");
        }
        if(data.message == "user already registered"){
            setAlertMessage(
                "User already registered"
              );
              setAlertSeverity("info");
        }
        if (data.message == "successfully signup with email") {
          setAlertMessage(
            "Successfully registered. Please check your email and confirm your account."
          );
          setAlertSeverity("success");
          setFormData({
            name: "",
            email: "",
            password: "",
            rePassword: "",
          });
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
            Sign up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              helperText={
                formData.name.length > 0 && formData.name.length < 5 ? (
                  <p style={{ color: "red" }}>
                    Name should greater than 5 letter
                  </p>
                ) : (
                  ""
                )
              }
              value={formData.name}
              onChange={handleChange}
            />
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="rePassword"
              label="Confirm Password"
              type="password"
              id="rePassword"
              helperText={
                formData.password !== formData.rePassword ? (
                  <p style={{ color: "red" }}>
                    Confirm password should same as password
                  </p>
                ) : (
                  ""
                )
              }
              value={formData.rePassword}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
            <p>Already have an account? Let's Login</p>
            <Button type="submit" fullWidth variant="contained" color="success">
              Login
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
