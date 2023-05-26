import { Box, Modal, TextField, Typography, Button, Alert } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Appcontext";


const InventoryModal = ({ open, handleClose, rowData }) => {
    let authDetailsId = JSON.parse(localStorage.getItem("authDetails"));
    let userId = +authDetailsId.id;
    // console.log(userId)
  const [formValues, setFormValues] = useState({
    image: null,
    bullet_points: [],
    odometer_km: 0,
    title: "",
    major_scratches: false,
    original_paint: false,
    accidents_reported: 0,
    previous_buyers: 0,
    registration_place: "",
    userId : userId
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const handleChange = (e) => {
    const { name, value, type, checked, files  } = e.target;
    if (type === "checkbox") {
      setFormValues((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else if (type === "number") {
      setFormValues((prevFormData) => ({
        ...prevFormData,
        [name]: parseInt(value, 10),
      }));
    } else if (name === "bullet_points") {
      const bulletPointsArray = value
        .split(",")
        .map((point) => ({ point: point.trim() }));
      setFormValues((prevFormData) => ({
        ...prevFormData,
        bullet_points: bulletPointsArray,
      }));
    } else {
      setFormValues((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(formValues)
      
    fetch(`http://localhost:8080/inventry/addInventry/${rowData.inventory._id }`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if(
            data.message ==
            "OEM model not found"
          ) {
            setAlertMessage(data.message);
            setAlertSeverity("info");
          }
          if(data.message == "Internal server error"){
              setAlertMessage(
                  "Internal server error"
                );
                setAlertSeverity("error");
          }
          if(data.message == "Inventry data save add successfully") {
            setAlertMessage(
              "Inventry data save add successfully"
            );
            setAlertSeverity("success");
            setFormValues({
                image: "",
                bullet_points: [],
                odometer_km: 0,
                title: "",
                major_scratches: false,
                original_paint: false,
                accidents_reported: 0,
                previous_buyers: 0,
                registration_place: "",
            });
            
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
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 450, bgcolor: "background.paper", p: 2 }}>
      {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
          {alertMessage}
        </Alert>
      )}
        <Typography variant="h6" component="h2" margin="normal">
          Inventory Details
        </Typography>
        <br/>
        <div style={{ maxHeight: "80vh", overflowY: 'auto' }}>
        <form onSubmit={handleSubmit}>
        <TextField
            margin="normal"
            name="title"
            label="Title"
            value={formValues.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            name="bullet_points"
            label="Description  (comma-separated)"
            value={formValues.bullet_points
              .map((point) => point.point)
              .join(", ")}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            name="odometer_km"
            label="Odometer (in km)"
            type="number"
            value={formValues.odometer_km}
            onChange={handleChange}
            fullWidth
            required
          />
          
          <div>
            <label htmlFor="major_scratches">
              Major Scratches:
              <input
                type="checkbox"
                id="major_scratches"
                name="major_scratches"
                checked={formValues.major_scratches}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="original_paint">
              Original Paint:
              <input
                type="checkbox"
                id="original_paint"
                name="original_paint"
                checked={formValues.original_paint}
                onChange={handleChange}
              />
            </label>
          </div>
          <TextField
            margin="normal"
            name="accidents_reported"
            label="Accidents Reported"
            type="number"
            value={formValues.accidents_reported}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            name="previous_buyers"
            label="Previous Buyers"
            type="number"
            value={formValues.previous_buyers}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            name="registration_place"
            label="Registration Place"
            value={formValues.registration_place}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            name="image"
            label="Image url"
            value={formValues.image}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        </div>
      </Box>
    </Modal>
  );
};

export default InventoryModal;
