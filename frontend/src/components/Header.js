import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Container,
  Avatar,
  Button,
  Autocomplete,
  TextField
} from '@mui/material';
import {
  Menu as MenuIcon,
  Adb as AdbIcon,
  Movie as MovieIcon,
} from '@mui/icons-material';
import { getAllMovies } from '../api-helpers/api-helpers';
import { adminActions, userActions } from '../store';

const userPages = ['Filmes']
const notLoginPage = ['Filmes','Auth','Admin']
const AdminPages = ['Adicionar Filme']
const settings = ['Profile', 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
    // Encaminha para a página do filme pesquisado
    const navigate = useNavigate();
    const handleChange = (e, val) => {
      const movie = movies.find((m) => m.title === val);
      if (isUserLoggedIn || isAdminLoggedIn) {
        navigate(`/booking/${movie._id}`);
      }
    };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HOME
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {notLoginPage.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <MovieIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HOME
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {!isAdminLoggedIn && !isUserLoggedIn &&(
                <>
                {notLoginPage.map((page) => (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
            ))}
                </>
            )}

            {isUserLoggedIn && (
            <>
                {userPages.map((page) => (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
                ))}
            </>
            )}

            {isAdminLoggedIn && (
            <>
            {AdminPages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            </>
            )}

          </Box>
          <Box sx={{ flexGrow: 0 }}>
                {(isAdminLoggedIn || isUserLoggedIn) &&(
                <>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </>)}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;