import React, { useEffect, useState } from "react";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import MovieIcon from "@mui/icons-material/Movie"
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";

const dummyArray = ["Teste","Teste1"];

const Header = () => {
  return (
    <AppBar>
        <Toolbar>
                <Box width={'20%'}>
                    <MovieIcon/>
                </Box>
                <Box width="50%" marginRight={"auto"} marginLeft="auto">
                  <Autocomplete
                    freeSolo
                    options={dummyArray.map((option) => option)}
                    renderInput={(params) => (
                      <TextField variant="standard" 
                      {...params} label="Search Acrros Multiple Movies"/>
                    )}
                  />
                </Box> 
                <Box display="flex">
                      <Tabs textColor ="inherit" indicatorColor="secondary" value={1} >
                        <Tab label="Movies"/>
                        <Tab label="Admin" />
                        <Tab label="Auth" />
                      </Tabs>
                </Box>       
        </Toolbar>
    </AppBar>
  );
};

export default Header;
