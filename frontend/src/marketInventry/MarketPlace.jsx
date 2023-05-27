import {
  Button,
  Typography,
  CardContent,
  Card,
  Alert,
  CardMedia,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./marketInventry.css";
import React, { useEffect, useState } from "react";
import EditMarketInventry from "./EditMarketInventry";


const selectedCardStyle = {
  backgroundColor: "#AFDBF5",
};

const MarketPlace = () => {
    let authDetailsId = JSON.parse(localStorage.getItem("authDetails"));
    let userId = authDetailsId.id;
    let token = authDetailsId.token;
  const [inventrydata, setInventryData] = useState([]);
  const [filters, setFilters] = useState({
    filterBy: "",
    filterValue: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [selectedInventry, setSelectedInventory] = useState([])
  const [openInventry,setOpenInventoryForm] = useState(false)
 
 
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    let filteredItems = inventrydata;

    // Apply selected filter
    if (filters.filterBy !== "" && filters.filterValue !== "") {
      filteredItems = filteredItems.filter((item) => {
        const filterValue = parseFloat(filters.filterValue);
        const itemValue = parseFloat(item.model_id[filters.filterBy]);

        if (isNaN(filterValue)) {
          return true;
        }

        return itemValue === filterValue;
      });
    }

    setFilteredData(filteredItems);
  };
  const handleCardSelect = (cardId) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards((prevSelectedCards) =>
        prevSelectedCards.filter((id) => id !== cardId)
      );
    } else {
      setSelectedCards((prevSelectedCards) => [...prevSelectedCards, cardId]);
    }
  };
  const handleDeleteSelectedCards = () => {
    fetch("http://localhost:8080/inventry/deleteInventry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(selectedCards),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "No matching inventory found") {
          setAlertMessage(data.message);
          setAlertSeverity("info");
        }
        if (data.message == "Invalid IDs array") {
          setAlertMessage("Invalid IDs array");
          setAlertSeverity("info");
        }
        if (data.message == "Internal server error") {
          setAlertMessage("Internal server error");
          setAlertSeverity("error");
        }
        if (data.message == "Inventory data deleted successfully") {
            getInventryData();
          setAlertMessage("Inventory data deleted successfully");
          setAlertSeverity("success");
          
        } else {
          throw new Error("Signup failed");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function getInventryData() {
    console.log(userId)
    fetch(`http://localhost:8080/inventry/allInventry/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
      })
      .then((res) => res.json())
      .then((data) => {
        setInventryData(data);
        setFilteredData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const handleEditInventry = (data) => {
    setSelectedInventory(data);
    setOpenInventoryForm(true);
  };
  const handleCloseModal = () => {
    setOpenInventoryForm(false);
  };
  console.log(filteredData)
  useEffect(() => {
    getInventryData();
  }, []);
  return (
    <div>
     <div className="filterContainer">
        <select
          name="filterBy"
          value={filters.filterBy}
          onChange={handleFilterChange}
          className="filterInput"
        >
          <option value="">Select Filter</option>
          <option value="list_price">Price</option>
          <option value="colors">Colors</option>
          <option value="mileage">Mileage</option>
        </select>
        {filters.filterBy !== "" && (
          <input
            type="text"
            name="filterValue"
            value={filters.filterValue}
            onChange={handleFilterChange}
            placeholder={`Enter ${filters.filterBy} value`}
            className="filterInput"
          />
        )}{" "}
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
      {selectedCards.length > 0 && (
        <div className="deleteBtn">
          <Button variant="contained" onClick={handleDeleteSelectedCards}>
            Delete Selected Cards
          </Button>
        </div>
      )}
      {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage("")}>
          {alertMessage}
        </Alert>
      )}
      {filteredData.length <= 0 ? (
        <Typography variant="h5" component="div">
          Data not available or yet not add any inventry
        </Typography>
      ) : (
        <div className="cardGrid">
          {filteredData &&
            filteredData.map((data, i) => (
                
              <Card key={i} className="card">
                <div
                  style={
                    selectedCards.includes(data._id) ? selectedCardStyle : {}
                  }
                  onClick={() => handleCardSelect(data._id)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={data.image}
                    alt="Car Image"
                  />
                  <CardContent className="cardContent">
                    <Typography variant="h5" component="div">
                      Model Name: {data.model_id.model_name}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Year: {data.model_id.year}
                    </Typography>
                    <Typography variant="body1" component="div">
                      List Price: {data.model_id.list_price}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Colors: {data.model_id.colors.join(", ")}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Mileage: {data.model_id.mileage}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Power (BHP): {data.model_id.power}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Max Speed: {data.model_id.max_speed}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Major Scraches: {data.major_scratches? "No" : "Yes"}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Original Paint: {data.original_paint ? "No" : "Yes"}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Accident reported: {data.accidents_reported}
                    </Typography>
                    <Typography variant="body1" component="div">
                     Previous buyers: {data.previous_buyers}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Registration place: {data.registration_place}
                    </Typography>
                    <Typography variant="body1" component="div">
                      Description:
                    </Typography>
                    <ul>
                      {data.bullet_points.map((point, j) => (
                        <li key={j}>{point.point}</li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
                <div  className="editBtn">
                <Button
                  variant="contained"
                  
                  onClick={() => handleEditInventry(data)}
                 
                >
                  Edit
                </Button>
                </div>
               
              </Card>
            ))}
        </div>
      )}
      {
        openInventry ? <div>
              <EditMarketInventry openInventry={openInventry} selectedInventry={selectedInventry} handleCloseModal={handleCloseModal}/>
        </div> : ""
      }
    </div>
  );
};

export default MarketPlace;
