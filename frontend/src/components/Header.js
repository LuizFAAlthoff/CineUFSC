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
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  /* Extrai o estado do Redux Store */
  const isAdminLoggedIn = useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn);

  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  //Logout
  const dispatch = useDispatch();
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
              <MovieIcon/>
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
                placeholder="Pesquise através de multiplos filmes"
              />
            )}
          />
        </Box>
        <Box display="flex">
        <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Filmes" />
            {!isAdminLoggedIn && !isUserLoggedIn && [
              <Tab key="admin" LinkComponent={Link} to="/admin" label="Admin" />,
              <Tab key="auth" LinkComponent={Link} to="/auth" label="Auth" />,
            ]}
            {isUserLoggedIn && (
              [
                <Tab key="profile" LinkComponent={Link} to="/user" label="Perfil" />,
                <Tab key="logout" onClick={() => logout(false)} label="Logout" LinkComponent={Link} to="/" />,
              ]
            )}
            {isAdminLoggedIn && (
              [
                <Tab key="add" LinkComponent={Link} to="/add" label="Adicionar Filme" />,
                <Tab key="profile" LinkComponent={Link} to="/user-admin" label="Perfil" />,
                <Tab key="logout" onClick={() => logout(true)} label="Logout" LinkComponent={Link} to="/" />,
              ]
            )}
          </Tabs>
       </Box> 
      </Toolbar>
    </AppBar>
  );
};

export default Header;