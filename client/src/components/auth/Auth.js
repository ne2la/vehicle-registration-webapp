import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from '../../actions/auth';
import { Link } from 'react-router-dom';

const initialState = { firstName:"", lastName:"", email:"", password:"",confirmPassword:"" }

const Auth = () => {

    const [formData,setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
  
    const switchMode = () => {
      setIsSignup(!isSignup)
      setShowPassword(false)
    };
  
    const handleSubmit = (e) => {
      
      e.preventDefault();

      if(isSignup){
        dispatch(signup(formData,navigate));
      }else{
        dispatch(signin(formData,navigate));
      }

    };
  
  
    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value });
    }

  return (

    <Container component="main" maxWidth="xs" style={{paddingBottom:"60px"}} sx={{top:150,left:0,right:0,bottom:0,position:"absolute",margin:"auto"}}>

      <Paper elevation={3} sx={{marginTop:1,display:"flex",flexDirection:"column",alignItems:"center",padding:1}}>

        <Avatar sx={{backgroundColor:"#f44336",margin:1}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>

        <form style={{width:"100%",marginTop:"15px"}} onSubmit={handleSubmit}>

          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" sx={{marginTop:2,marginBottom:1}}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
   
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>

              <Button component={Link} to="/" sx={{marginTop:1}}>
                Enter without a account
              </Button>

            </Grid>
          </Grid>

        </form>

      </Paper>
    </Container>
  )
}

export default Auth