import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material'
import React from 'react'
const labelProsp = {
    mt: 1,
    mb: 1,
}
const AddMovie = () => {
  return (
    <div>
        <form>
            <Box width={'50%'} padding={10} margin="auto" display={'flex'} flexDirection={'column'} boxShadow={'10px 10px 20px #ccc'}>
                <Typography textAlign={"center"} variant='h5' fontFamily={"verdana"}>
                    Adicionar Novo Filme
                </Typography>
                <FormLabel sx={{ labelProsp}}>Titulo</FormLabel>
                <TextField name="title" variant='standard' margin='normal'></TextField>
                <FormLabel sx={{ labelProsp}} >Descrição</FormLabel>
                <TextField name="description" variant='standard' margin='normal'></TextField>
                <FormLabel sx={{ labelProsp}} >URL do Poster</FormLabel>
                <TextField name="poerUrl" variant='standard' margin='normal'></TextField>
                <FormLabel sx={{ labelProsp}} >Data de Lançamento</FormLabel>
                <TextField name="releaseDate" variant='standard' margin='normal'></TextField>
                <FormLabel sx={{ labelProsp}} >Atores</FormLabel>
                <Box display={"flex"}>
                    <TextField name="actors" variant='standard' margin='normal'></TextField>
                    <Button>Adicionar</Button>
                </Box>
                <FormLabel sx={{ labelProsp}} >Featured</FormLabel>
                <Checkbox sx={{mr:"auto"}}/>
                <Button variant='contained' sx={{margin:"auto", width:"30%", bgcolor:"#2b2d42", ":hover":{bgcolor:"#121217"},}}> 
                    Adicionar Novo Filme
                </Button>
            </Box>
        </form>
    </div>
  )
}

export default AddMovie