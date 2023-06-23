import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
const labelProsp = {
    mt: 1,
    mb: 1,
}
const AddMovie = () => {
  //Mudança do estados dos elementos do forms
  const [inputs, setInputs] = useState({title:"",description:"",posterUrl:"",releaseDate:"",featured: false,});
  const handleChange = (e) =>{
    setInputs( (prevState)=>({...prevState,[e.target.name]:e.target.value}));
  };
  //Submissão do forms
  const handleSubmit = (e)=>{
    e.preventDefault(); //previne o browser envie a informação para a URL
    console.log(inputs);
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box width={'50%'} padding={10} margin="auto" display={'flex'} flexDirection={'column'} boxShadow={'10px 10px 20px #ccc'}>
                <Typography textAlign={"center"} variant='h5' fontFamily={"verdana"}>
                    Adicionar Novo Filme
                </Typography>
                <FormLabel sx={{ labelProsp}}>Titulo</FormLabel>
                <TextField value={inputs.title} onChange={handleChange} name="title" variant='standard' margin='normal'></TextField>

                <FormLabel sx={{ labelProsp}} >Descrição</FormLabel>
                <TextField value={inputs.description} onChange={handleChange} name="description" variant='standard' margin='normal'></TextField>

                <FormLabel sx={{ labelProsp}} >URL do Poster</FormLabel>
                <TextField value={inputs.posterUrl} onChange={handleChange} name="posterUrl" variant='standard' margin='normal'></TextField>

                <FormLabel sx={{ labelProsp}} >Data de Lançamento</FormLabel>
                <TextField  type={'date'} value={inputs.releaseDate} onChange={handleChange} name="releaseDate" variant='standard' margin='normal'></TextField>

                <FormLabel sx={{ labelProsp}} >Atores</FormLabel>
                <Box display={"flex"}>
                    <TextField name="actors" variant='standard' margin='normal'></TextField>
                    <Button>Adicionar</Button>
                </Box>
                <FormLabel sx={{ labelProsp}} >Featured</FormLabel>
                <Checkbox name="fetaured" checked={inputs.featured} onClick={(e) => 
                    setInputs((prevSate) => ({
                        ...prevSate,
                    featured: e.target.checked,
                     }))
                    }
                    sx={{ mr: "auto" }}
                />

                <Button type='submit' variant='contained' sx={{margin:"auto", width:"30%", bgcolor:"#2b2d42", ":hover":{bgcolor:"#121217"},}}> 
                    Adicionar Novo Filme
                </Button>
            </Box>
        </form>
    </div>
  )
}
export default AddMovie