import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
import { getAllMovies } from "../api-helpers/api-helpers";

const Header = () => {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (isUserLoggedIn || isAdminLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const renderMenuItems = () => {
    if (isUserLoggedIn) {
      return [
        <MenuItem variant="standard" key="profile" component={Link} to="/user" onClick={handleMenuClose}>
          PERFIL
        </MenuItem>,
        <MenuItem variant="standard" key="logout" onClick={() => logout(false)} component={Link} to="/" sx={{ color: "red" }}>
          LOGOUT
        </MenuItem>
      ];
    }

    if (isAdminLoggedIn) {
      return [
        <MenuItem variant="standard" key="add" component={Link} to="/add" onClick={handleMenuClose}>
          ADICIONAR FILME
        </MenuItem>,
        <MenuItem variant="standard" key="profile" component={Link} to="/user-admin" onClick={handleMenuClose}>
          PERFIL
        </MenuItem>,
        <MenuItem variant="standard" key="logout" onClick={() => logout(true)} component={Link} to="/" sx={{ color: "red" }}>
          LOGOUT
        </MenuItem>
      ];
    }
    return [
      <MenuItem variant="standard" key="admin" component={Link} to="/admin" onClick={handleMenuClose}>
        ADMIN
      </MenuItem>,
      <MenuItem variant="standard" key="auth" component={Link} to="/auth" onClick={handleMenuClose}>
        AUTH
      </MenuItem>
    ];
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        {isMobile ? (
          <IconButton component={Link} to="/" sx={{ display: isMobile ? "block" : "none" }}>
            <MovieIcon />
          </IconButton>
        ) : (
          <Box>
            <IconButton component={Link} to="/">
              <MovieIcon />
            </IconButton>
          </Box>
        )}
        <Box width={isMobile ? "100%" : "30%"} margin={isMobile ? "10px 0" : "auto"}>
          <Autocomplete
            onChange={handleChange}
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
        {isMobile ? (
          <Box flexGrow={1} textAlign="end">
            <IconButton onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        ) : (
          <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e, val) => setValue(val)}>
            <Tab component={Link} to="/movies" label="Filmes" />
            {renderMenuItems()}
          </Tabs>
        )}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {renderMenuItems()}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;