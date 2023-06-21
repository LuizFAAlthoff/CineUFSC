import React, { useEffect, useState } from "react";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import MovieIcon from "@mui/icons-material/Movie"
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import { getAllMovies } from "../../api-helpers/api-helpers";

const Header = () => {
    const [value, setValue] = useState(0);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      getAllMovies()
        .then((data)=> setMovies(data.movies))
        .catch((err) => console.log(err));
    },[]);
  return (
    <AppBar position="stick" sx={{bgcolor:"#2b2d42"}}> 
        <Toolbar>
                <Box width={'20%'}>
                    <MovieIcon/>
                </Box>
                <Box width="30%" marginRight={"auto"} marginLeft="auto">
                  <Autocomplete
                    freeSolo
                    options={movies && movies.map((option) => option.tile)}
                    renderInput={(params) => (
                      <TextField sx={{ input: {color:"white"}}} variant="standard" 
                      {...params} 
                      placeholder="Search Acrros Multiple Movies"/>
                    )}
                  />
                </Box> 
                <Box display="flex">
                      <Tabs textColor ="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)} >
                        <Tab LinkComponent={Link} to="/movies" label="Movies" />
                        <Tab LinkComponent={Link} to="/admin" label="Admin" />
                        <Tab LinkComponent={Link} to="/admin" label="Auth" />
                      </Tabs>
                </Box>       
        </Toolbar>
    </AppBar>
  );
};

export default Header;
