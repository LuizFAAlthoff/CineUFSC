import React, { Fragment, useEffect, useState } from 'react';
import { deleteBooking, getUserBooking, getUserDetails } from '../../api-helpers/api-helpers';
import { Box, IconButton, List, ListItem, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const UserProfile = () => {
  const [user, setUser] = useState();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <Box width="100%" display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center">
      {user && (
        <Box
          flexDirection="column"
          justifyContent="center"
          alignItems={{ xs: "center", md: "flex-start" }}
          width={{ xs: "100%", md: "30%" }}
          padding={3}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <AccountCircleIcon
              sx={{ fontSize: { xs: "6rem", md: "10rem" }, textAlign: { xs: "center", md: "left" }, ml: 3 }}
            />
            <Typography
              mt={1}
              padding={1}
              width="auto"
              textAlign="center"
              border="1px solid #ccc"
              borderRadius={6}
              sx={{ wordWrap: 'break-word' }}
            >
              Nome: {user.name}
            </Typography>

            <Typography
              mt={1}
              padding={1}
              width="auto"
              textAlign="center"
              border="1px solid #ccc"
              borderRadius={6}
              sx={{ wordWrap: 'break-word' }}
            >
              Email: {user.email}
            </Typography>
          </Box>
        </Box>
      )}

      {user && (
        <Box width="100%" display="flex" flexDirection="column" alignItems={{ xs: "center", md: "center" }}>
          <Box display="flex" flexDirection="column" alignItems={{ xs: "center", md: "flex-start" }}>
            <Typography
              variant="h3"
              fontFamily="verdana"
              textAlign={{ xs: "center", md: "left" }}
              padding={2}
            >
              RESERVAS
            </Typography>

            <Box margin="auto" width="80%">
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      borderRadius: 3,
                    }}
                  >
                    <Typography
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      variant="body1"
                    >
                      Filme: {booking.movie.title}
                    </Typography>

                    <Typography
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      variant="body1"
                    >
                      Assento: {booking.seatNumber}
                    </Typography>

                    <Typography
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      variant="body1"
                    >
                      Data: {new Date(booking.date).toDateString()}
                    </Typography>

                    <IconButton onClick={() => { handleDelete(booking._id); refreshPage(); }} color='error'>
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;