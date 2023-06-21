import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { getAllMovies } from "../../api-helpers/api-helpers";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width="20%">
          <Link to="/" style={{ color: "white" }}>
            <MovieCreationIcon />
          </Link>
        </Box>
        <Box width="50%" marginRight={"auto"} marginLeft="auto">
          <Autocomplete
            sx={{ borderRadius: 10, width: "40%", margin: "auto" }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "white" },
                  bgcolor: "#2b2d42",
                  padding: "6px",
                }}
                variant="standard"
                placeholder="Pesquise através de multiplos filmes:"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Box>
        <Box display="flex">
                      <Tabs textColor ="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)} >
                        <Tab LinkComponent={Link} to="/movies " label="Filmes" />
                        <Tab LinkComponent={Link} to="/admin" label="Admin" />
                        <Tab LinkComponent={Link} to="/admin" label="Auth" />
                      </Tabs>
       </Box> 
      </Toolbar>
    </AppBar>
  );
};

export default Header;
