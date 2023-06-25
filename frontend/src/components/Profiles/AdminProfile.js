import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { deleteMovie, getAdminById, getAllMovies } from "../../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  const [movies, setMovies] = useState();

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));

    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  // Função para atualizar a página
  const refreshPage = () => {
    window.location.reload();
  }

  // Função para deletar reservas
  const handleDelete = (id) => {
    deleteMovie(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box width="100%" display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center">
      {admin && (
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
              Email: {admin.email}
            </Typography>
          </Box>
        </Box>
      )}

      {admin && (
        <Box width="100%" display="flex" flexDirection="column" alignItems={{ xs: "center", md: "center" }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h3"
              fontFamily="verdana"
              textAlign={{ xs: "center", md: "center" }}
              padding={2}
            >
              Filmes Adicionados
            </Typography>

            <Box
              margin="auto"
              display="flex"
              flexDirection="column"
              width="80%"
            >
              <List>
                {movies && movies.map((movie, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      borderRadius: 3,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Filme: {movie.title}
                    </ListItemText>
                    <IconButton onClick={() => { handleDelete(movie._id); refreshPage() }} color='error'>
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

export default AdminProfile;