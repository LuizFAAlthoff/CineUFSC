import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMoviesDetails, newBooking } from '../../api-helpers/api-helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const Booking = () => {

    const [movie, setMovie] = useState();
    const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
    const id = useParams().id;
    useEffect(()=>{
        getMoviesDetails(id)
            .then((res)=>setMovie(res.movie))
            .catch((err)=> console.log(err));
    },[id]);
    const handleChange = (e)=>{
        setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value}));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        newBooking({ ...inputs, movie: movie._id })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
    }
  return (
    <div>{movie && <Fragment>
    <Typography 
        padding={3} 
        fontFamily="fantasy" 
        variant='h4' 
        textAlign={"center"}> 
            Agende Ingressos para: {movie.title}
    </Typography>
    <Box display={'flex'} justifyContent={'center'}>
        <Box 
            display={'flex'} 
            justifyContent={'column'} 
            flexDirection={'column'} 
            paddingTop={3} 
            width={"50%"}
            marginRight={"auto"} >
                <img width={"80%"} src={movie.posterUrl} alt={movie.title} />
            <Box width={"80%"} marginTop={3} padding={2}>
                <Typography paddingTop={2} >
                    {movie.description}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1}>
                    Estrelando: 
                    {movie.actors.map((actor)=> " " + actor + ", ")}
                </Typography>
                <Typography fontWeight={'bold'} marginTop={1}>
                    Lançamento: { new Date( movie.releaseDate).toDateString()}
                </Typography>
            </Box>
        </Box>
        <Box width={"50%"} paddingTop={3}>
            <form onSubmit={handleSubmit}>
                <Box padding={5} margin={'auto'} display={'flex'} flexDirection={"column"}>
                    <FormLabel> Assento</FormLabel>
                    <TextField  onChange={handleChange} value={inputs.setaNumber } name="seatNumber" type={'number'} margin="normal" variant='standard'/>
                    <FormLabel> Data</FormLabel>
                    <TextField onChange={handleChange} value={inputs.date } name="date" type={'date'} margin="normal" variant='standard'/>
                    <Button type='submit' sx={{mt:3}}> Agendar</Button>
                </Box>
            </form>
        </Box>
    </Box> 
    </Fragment>}</div>
  )
}

export default Booking