import React, { Fragment, useEffect, useState } from 'react'
import { getAdminById  } from '../../api-helpers/api-helpers'
import { Box, Button, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const AdminProfile = () => {
  const [admin, setAdmin] = useState();

  //Armazena os agendamentos do usuário

  useEffect(()=>{

    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));

  },[])
  return (
    <Box width={'100%'} display="flex">
      <Fragment>
      {" "}
      {admin && (
        <Box padding={3} flexDirection={'column'} justifyContent="center" alignItems={"center"} width={"30%"}>
        <AccountCircleIcon sx={{fontSize: "10rem", textAlign:"center", ml:3}} />
        <Typography padding={1} width={"auto"} textAlign={"center"} border={'1px solid #ccc'} borderRadius={6}>
          Email: {admin.email}
        </Typography>
        </Box>
      )}

      {admin.addedMovies && (
        <Box width={"70%"} display="flex" flexDirection={"column" }>
        <Typography variant='h3' fontFamily={"verdana"} textAlign="center" padding={2}>
          Filmes Adicionados
        </Typography>
        <Box margin={'auto'} display="flex" flexDirection={"column"} width="80%">
          <List>
            {admin.addedMovies.map((movie,index) => (
              <ListItem sx={{bgcolor: "#00d386", color: "white", textAlign:"center",margin: 1,}}>

                <ListItemText sx={{margin:1,width:'auto',textAlign:"left"}}>
                  Filme: {movie.title}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
        </Box>
      )}

      </Fragment>
    </Box>
  )
}
export default AdminProfile