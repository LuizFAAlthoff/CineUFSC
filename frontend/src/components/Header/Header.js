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
    const [value, setValue] = useState(0)
  return (
    <AppBar sx={{bgcolor:"#2b2d42"}}> 
        <Toolbar>
                <Box width={'20%'}>
                    <MovieIcon/>
                </Box>
                <Box width="30%" marginRight={"auto"} marginLeft="auto">
                  <Autocomplete
                    freeSolo
                    options={dummyArray.map((option) => option)}
                    renderInput={(params) => (
                      <TextField sx={{ input: {color:"white"}}} variant="standard" 
                      {...params} 
                      placeholder="Search Acrros Multiple Movies"/>
                    )}
                  />
                </Box> 
                <Box display="flex">
                      <Tabs textColor ="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)} >
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
