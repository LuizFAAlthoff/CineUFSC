import React, { Fragment, useEffect, useState } from 'react'
import { deleteBooking, getUserBooking } from '../../api-helpers/api-helpers'
import { Box, Button, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const UserProfile = () => {
  //Armazena os agendamentos do usuário
  const [bookings, setBookings] = useState([]);
  useEffect(()=>{
    getUserBooking()
      .then((res)=> setBookings(res.bookings))
      .catch((err) => console.log(err));
  },[])

  const handDelete =(id)=>{
    deleteBooking(id)
      .then((res)=>console.log(res))
      .catch((err)=> console.log(err));
  }

  return (
    <Box width={'100%'} display="flex">
    {bookings && bookings.length > 0 &&(
      <Fragment>
        {" "}
      <Box padding={3} flexDirection={'column'} justifyContent="center" alignItems={"center"} width={"30%"}>
        <AccountCircleIcon sx={{fontSize: "10rem", textAlign:"center", ml:3}} />
        <Typography marginTop={1} padding={1} width={"auto"} textAlign={"center"} border={'1px solid #ccc'} borderRadius={6}>
          name: {bookings[0].user.name}
        </Typography>
        <Typography padding={1} width={"auto"} textAlign={"center"} border={'1px solid #ccc'} borderRadius={6}>
          Email: {bookings[0].user.email}
        </Typography>
      </Box>
      <Box width={"70%"} display="flex" flexDirection={"column" }>
        <Typography variant='h3' fontFamily={"verdana"} textAlign="center" padding={2}>
          Reservas
        </Typography>
        <Box margin={'auto'} display="flex" flexDirection={"column"} width="80%">
          <List>
            {bookings.map((booking,index) => (
              <ListItem sx={{bgcolor: "#00d386", color: "white", textAlign:"center",margin: 1,}}>

                <ListItemText sx={{margin:1,width:'auto',textAlign:"left"}}>
                  Filme: {booking.movie.title}
                </ListItemText>

                <ListItemText sx={{margin:1,width:'auto',textAlign:"left"}}>
                  Assento: {booking.seatNumber}
                </ListItemText>

                <ListItemText sx={{margin:1,width:'auto',textAlign:"left"}}>
                  Data: {new Date(booking.date).toDateString()}
                </ListItemText>

                <IconButton onClick={handDelete} color='error'>
                  <DeleteForeverIcon/>
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      </Fragment>
      )}
    </Box>
  )
}

export default UserProfile;