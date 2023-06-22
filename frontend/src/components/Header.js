import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin="auto">
          <Autocomplete
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Pesquise através de multiplos filmes:"
              />
            )}
          />
        </Box>
        <Box display="flex">
                      <Tabs textColor ="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)} >
                        <Tab LinkComponent={Link} to="/movies " label="Filmes" />
                        <Tab LinkComponent={Link} to="/admin" label="Admin" />
                        <Tab LinkComponent={Link} to="/auth" label="Auth" />
                      </Tabs>
       </Box> 
      </Toolbar>
    </AppBar>
  );
};

export default Header;