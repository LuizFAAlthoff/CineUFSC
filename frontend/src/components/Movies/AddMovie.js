import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material'
import React from 'react'

const AddMovie = () => {
  return (
    <div>
        <form>
            <Box width={'50%'} padding={10} margin="auto" display={'flex'} flexDirection={'column'} boxShadow={'10px 10px 20px #ccc'}>
                <Typography textAlign={"center"} variant='h5' fontFamily={"verdana"}>
                    Adicionar Novo Filme
                </Typography>
                <FormLabel>Titulo</FormLabel>
                <TextField name="title" variant='standard' margin='normal'></TextField>
                <FormLabel>Descrição</FormLabel>
                <TextField name="description" variant='standard' margin='normal'></TextField>
                <FormLabel>URL do Poster</FormLabel>
                <TextField name="poerUrl" variant='standard' margin='normal'></TextField>
                <FormLabel>Data de Lançamento</FormLabel>
                <TextField name="releaseDate" variant='standard' margin='normal'></TextField>
                <FormLabel>Atores</FormLabel>
                <Box display={"flex"}>
                    <TextField name="actors" variant='standard' margin='normal'></TextField>
                    <Button>Adicionar</Button>
                </Box>
                <FormLabel>Featured</FormLabel>
                <Checkbox sx={{mr:"auto"}}/>
            </Box>
        </form>
    </div>
  )
}

export default AddMovie