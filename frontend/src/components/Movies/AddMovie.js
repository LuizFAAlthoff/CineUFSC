import { Box, Button, Checkbox, FormLabel, TextField, Typography, Grid, Container } from '@mui/material'
import React, { useState } from 'react'
import { addMovie } from '../../api-helpers/api-helpers';

const labelProps = {
  mt: 1,
  mb: 1,
}

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });

 //Função para atualiar tela
  const refreshPage = ()=>{
    window.location.reload();
  }

  // Mudanca do estado dos inputs
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  // Submissao do forms e chamada da API para criacao do filme
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <Container fixed marginTop={4}>
    <Grid item xs={12} md={6} lg={4} >
      <form onSubmit={handleSubmit}>
        <Box padding={10} margin="auto" display={'flex'} flexDirection={'column'} boxShadow={'10px 10px 20px #ccc'}>
          <Typography width={"auto"} textAlign={"center"} variant='h5' fontFamily={"verdana"}>
             Novo Filme
          </Typography>
          <FormLabel sx={labelProps}>Titulo</FormLabel>
          <TextField value={inputs.title} onChange={handleChange} name="title" variant='standard' margin='normal' />

          <FormLabel sx={labelProps} >Descrição</FormLabel>
          <TextField value={inputs.description} onChange={handleChange} name="description" variant='standard' margin='normal' />

          <FormLabel sx={labelProps} >URL do Poster</FormLabel>
          <TextField value={inputs.posterUrl} onChange={handleChange} name="posterUrl" variant='standard' margin='normal' />

          <FormLabel sx={labelProps} >Data de Lançamento</FormLabel>
          <TextField type={'date'} value={inputs.releaseDate} onChange={handleChange} name="releaseDate" variant='standard' margin='normal' />

          <FormLabel sx={labelProps} >Atores</FormLabel>
          <Box display={"flex"}>
            <TextField value={actor} name="actor" onChange={(e) => setActor(e.target.value)} variant='standard' margin='normal' />
            <Button onClick={() => {
              setActors([...actors, actor]);
              setActor("");
            }}>
              Adicionar
            </Button>
          </Box>

          <FormLabel sx={labelProps} >Featured</FormLabel>
          <Checkbox name="featured" checked={inputs.featured} onClick={(e) =>
            setInputs((prevState) => ({
              ...prevState,
              featured: e.target.checked,
            }))
          } sx={{ mr: "auto" }} />

          <Button type='submit' onClick={()=>{refreshPage()}} variant='contained' sx={{ margin: "auto", bgcolor: "#2b2d42", ":hover": { bgcolor: "#121217" } }}>
            Adicionar Novo Filme
          </Button>
        </Box>
      </form>
      </Grid>
    </Container>
  )
}

export default AddMovie;