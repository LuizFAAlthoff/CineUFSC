import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'

const MovieItem = ({title, releaseDate, posterURL, id}) => {
  return (
    <Card sx={{ 
        margin:5,
        maxWidth: 250, 
        height:320,
        borderRadius:5,
        ":hover":{
            boxShadow: "10px 10px 20px #ccc"
        }
        }}>
    <CardActionArea>
      <img height={"50%"} width="100%" src={posterURL} alt={title}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button sx={{ margin:"auto" }} size="small" color="primary">
        Share
      </Button>
    </CardActions>
  </Card>
  );
};

export default MovieItem