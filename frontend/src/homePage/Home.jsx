import { Autocomplete, Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./home.css";
import { DataGrid } from "@mui/x-data-grid";
import InventoryModal from "./InventoryModal";




const Home = () => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [OEMData, setOenData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSearch, setIssearch] = useState(false)

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "model_name", headerName: "Model_name", width: 200 },
    { field: "list_price", headerName: "List_price", width: 90 },
    { field: "colors", headerName: "Colors", width: 250 },
    { field: "mileage", headerName: "Mileage", width: 100 },
    { field: "power", headerName: "Power (BHP)", width: 120 },
    { field: "max_speed", headerName: "Max_speed", width: 180 },
    {
      field: "inventory",
      headerName: "Inventory",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleInventory(params.row)}
        >
          Add Inventory
        </Button>
      ),
    },
  ];
  const rows =
    OEMData &&
    OEMData.map((data, i) => ({
      id: i + 1,
      model_name: data.model_name,
      list_price: data.list_price,
      colors: data.colors,
      mileage: data.mileage,
      power: data.power,
      max_speed: data.max_speed,
      inventory: data,
    }));

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleInventory = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const hanleSearch = () => {
    setIssearch(true)
    fetch(`http://localhost:8080/oem/singleOemSpec?model_name=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setOenData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    fetch("http://localhost:8080/oem/allOemSpec")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="oemContainer">
        <div>
          <Autocomplete
            id="grouped-demo"
            options={options.sort(
              (a, b) => -b.model_name.localeCompare(a.model_name)
            )}
            groupBy={(option) => option.year}
            getOptionLabel={(option) => option.model_name}
            sx={{ width: 400 }}
            renderInput={(params) => (
              setSearchValue(params.inputProps.value),
              (
                <TextField
                  {...params}
                  label="OEM categories"
                  value={searchValue}
                  onChange={handleChange}
                />
              )
            )}
          />
        </div>
        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="searchBtn"
            onClick={hanleSearch}
          >
            Search
          </Button>
        </div>
      </div>
      {isSearch ? <div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
        <InventoryModal
          open={openModal}
          handleClose={handleCloseModal}
          rowData={selectedRow}
        />
      </div> : "No any data"
}
    </>
  );
};

export default Home;
