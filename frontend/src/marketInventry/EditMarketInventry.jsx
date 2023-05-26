import {
  Alert,
  Box,
  TextField,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const EditMarketInventry = ({
  openInventry,
  selectedInventry,
  handleCloseModal,
}) => {
  const [editedInventry, setEditedInventry] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value);
    setEditedInventry((prevInventry) => {
      if (type === "checkbox") {
        return {
          ...prevInventry,
          [name]: checked,
        };
      } else if (name === "bullet_points") {
        const bulletPointsArray = value
          .split(",")
          .map((point) => ({ point: point.trim() }));
        setEditedInventry((prevFormData) => ({
          ...prevFormData,
          bullet_points: bulletPointsArray,
        }));
      }
      return {
        ...prevInventry,
        [name]: value,
      };
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/inventry/updateInventry/${selectedInventry._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedInventry),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (
            data.message ==
            "Inventory item not found"
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
          if (data.message == "Data edit successfully") {
            setAlertMessage(
                "Data edit successfully"
            );
            setAlertSeverity("success");
            
          } 
         
        })
        .catch((error) => {
          console.error(error);
        });
    
  };
  useEffect(() => {
    setEditedInventry(selectedInventry);
  }, [selectedInventry]);
  return (
    <div>
      <Modal open={openInventry} onClose={handleCloseModal}>
        <Box sx={{ width: 450, bgcolor: "background.paper", p: 2 }}>
          {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
          {alertMessage}
        </Alert>
      )}
          <Typography variant="h6" component="h2" margin="normal">
           Update Inventory Details
          </Typography>
          <br />
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <form onSubmit={handleEditSubmit}>
              <TextField
                margin="normal"
                name="title"
                label="Title"
                value={editedInventry.title || ""}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                name="bullet_points"
                label="Description  (comma-separated)"
                value={ Array.isArray(editedInventry.bullet_points)
                    ? editedInventry.bullet_points.map((point) => point.point).join(", ")
                    : ""
                }
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                name="odometer_km"
                label="Odometer (in km)"
                type="number"
                value={editedInventry.odometer_km}
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
                    checked={editedInventry.major_scratches}
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
                    checked={editedInventry.original_paint}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <TextField
                margin="normal"
                name="accidents_reported"
                label="Accidents Reported"
                type="number"
                value={editedInventry.accidents_reported}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                name="previous_buyers"
                label="Previous Buyers"
                type="number"
                value={editedInventry.previous_buyers}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                name="registration_place"
                label="Registration Place"
                value={editedInventry.registration_place}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                name="image"
                label="Image url"
                value={editedInventry.image}
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
    </div>
  );
};

export default EditMarketInventry;
