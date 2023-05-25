import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./home.css" ;

const Home = () => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value); 
  };
  const hanleSearch = () => {
    console.log(searchValue)
  }
  useEffect(() => {
    fetch("http://localhost:8080/oem/allOemSpec")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  return (
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
            
            <TextField {...params} label="OEM categories"  value={searchValue}
            onChange={handleChange} />
            
          )}
        />
      </div>
      <div>
        <Button type="submit" fullWidth variant="contained" color="primary" className="searchBtn" onClick={hanleSearch} >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Home;
