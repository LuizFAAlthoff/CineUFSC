import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const labelStyle = {mt:1, mb: 1};
/* OnSubmit -> envia as informações para o componente pai*/
/* isAdmin -> Valida se o usuário está logando com um usuário elevado */
const AuthForm = ({onSubmit, isAdmin}) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  
  /* Função que gerencia a mudança de estado dos inputs, armazena o valor do campo anterior e o atual */
  const handleChange = (e) => {
    setInputs((preVState)=>({
        ...preVState,
        [e.target.name] : e.target.value,
    }));
  };
  /* Previne coportamento padrão do browser de fazer o refresh durante um submit */
  const handleSubmit = (e)=>{
    e.preventDefault();
    onSubmit({inputs, signup: isAdmin?false:isSignup}); /* envia os dados para o componente pai / valida se é um login ou signup*/


  };
  return <Dialog PaperProps={{style:{borderRadius:20}}} open={true}>
    <Box sx={{ml:"auto", padding:1}}>
        <IconButton LinkComponent={Link} to="/">
            <CloseRoundedIcon/>
        </IconButton>
    </Box>
    <Typography variant='h4' textAlign={"center"}> 
        {isSignup? "Signup":"Login"}
    </Typography>
    <form onSubmit={handleSubmit}>
        <Box
            padding={6}
            display={'flex'} 
            justifyContent={'center'} 
            flexDirection="column" 
            width={400} 
            margin="auto"
            alignContent={"center"}
        >
        {!isAdmin && isSignup &&( 
            <>
          {" "}
          <FormLabel sx={labelStyle} >Name</FormLabel>
          <TextField 
            value={inputs.name} 
            onChange={handleChange} 
            margin="normal" 
            varient="standard" 
            type={"text"} name="name" 
          />
          </>
        )}

          <FormLabel sx={labelStyle} >Email</FormLabel>
          <TextField 
                value={inputs.email} 
                onChange={handleChange} 
                margin="normal" 
                varient="standard" 
                type={"email"} 
                name="email" 
            />

          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField 
            value={inputs.password} 
            onChange={handleChange} 
            margin="normal" 
            varient="standard" 
            type={"password"} 
            name="password" 
          />

            <Button
                sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
                type="submit"
                fullWidth
                variant="contained"
            >
            {isSignup ? "Signup" : "Login"}
            </Button>
                {!isAdmin && (
                <Button
                onClick={() => setIsSignup(!isSignup)}
                sx={{ mt: 2, borderRadius: 10 }}
                fullWidth
                >
                Switch To {isSignup ? "Login" : "Signup"}
            </Button>
            )}
        </Box>
    </form>
  </Dialog>;
};

export default AuthForm;