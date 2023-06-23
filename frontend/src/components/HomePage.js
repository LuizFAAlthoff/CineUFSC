import { Box, Grid, Button, Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="50%" height={"100vh"} padding={2}>
      <img
          src="https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2023/05/boogey-1.jpg"
          alt="The Boogeyman"
          width="100%"
          height="100%%"
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Últimos Lançamentos
        </Typography>
      </Box>
      <Container fixed marginTop={4}>
      <Grid
        container
        margin={"auto"}
        display="flex"
        spacing={3}
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Grid>
      </Container>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          Veja todos os filmes
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
