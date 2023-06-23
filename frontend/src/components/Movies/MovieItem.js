import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  CardMedia
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Grid item xs={12} md={6} lg={4} >
      <Card
        sx={{
          minHeight: 320,
          borderRadius: 5,
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <CardMedia component="img" Style="object-fit: cover" height={"100"} width="100%" image={posterUrl} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(releaseDate).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
        <Button
            variant="contained"
            fullWidth
            LinkComponent={Link}
            to={`/booking/${id}`}
            sx={{
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
            size="small"
          >
            Agendar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieItem;
