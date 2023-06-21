import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import MovieItem from '../Movies/MovieItem';

const HomePage = () => {
  return <Box width={'100%'} height="100%" marginTop={2} martin="auto">
        <Box margin={"auto"} width="20%" height={"40vh%"} padding={2}>
            <img 
            src="https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2023/05/boogey-1-scaled.jpg" 
            alt="The Boogeyman"
            width={"100%"}
            height={"100%"}
            />
        </Box>
        <Box padding={3} margin="auto">
            <Typography variant='h4' textAlign={"center"}>
                Últimos Lançamentos
            </Typography>
        </Box>
        <Box 
            margin={"auto"} 
            display="flex" 
            width="80%" 
            justifyContent={"center"} 
            flexWrap="wrap"
            alignItems="center"
        >
            {[1,2,3,4].map((item) => (
                <MovieItem key={item} />
            ))}
        </Box>
        <Box display="flex" padding={5} margin="auto">
            <Button variant="outlined"  sx={{ margin:'auto', color:"#2b2d42"}}  > 
                {"Veja todos os filmes"}
            </Button>
        </Box>
    </Box>
};

export default HomePage