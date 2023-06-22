import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState } from 'react';
const labelStyle = {mt:1, mb: 1};
const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  return <Dialog PaperProps={{style:{borderRadius:20}}} open={true}>
    <Box sx={{ml:"auto", padding:1}}>
        <IconButton>
            <CloseRoundedIcon/>
        </IconButton>
    </Box>
    <Typography variant='h4' textAlign={"center"}> 
        {isSignup? "Signup":"Login"}
    </Typography>
    <form>
        <Box
            padding={6}
            display={'flex'} 
            justifyContent={'center'} 
            flexDirection="column" 
            width={400} 
            margin="auto"
            alignContent={"center"}
        >
        {isSignup &&( 
            <>
          {" "}
          <FormLabel sx={labelStyle} >Name</FormLabel>
          <TextField margin="normal" varient="standard" type={"text"} name="name" 
          />
          </>
        )}

          <FormLabel sx={labelStyle} >Email</FormLabel>
          <TextField margin="normal" varient="standard" type={"email"} name="email" />
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField margin="normal" varient="standard" type={"password"} name="password" />

          <Button variant="conatined" sx={{ mt:2, borderRadius:10, bgcolor:"#2b2d42" }} type='submit' fullWidth> {isSignup? "Signup":"Login"} </Button>


          <Button onClick={()=>setIsSignup(!isSignup)} sx={{ mt:2, borderRadius:10 }} fullWidth> Swtich to {isSignup?"Login ":"Signup"} </Button>
        </Box>
    </form>
  </Dialog>;
};

export default AuthForm;