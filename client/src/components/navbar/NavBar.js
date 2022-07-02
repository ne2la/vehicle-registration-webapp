import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Avatar, Button, Stack } from '@mui/material'
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import {Link} from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import decode from "jwt-decode"

const NavBar = () => {

  const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile"))); 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = () => {

    dispatch({type:"LOGOUT"});
    navigate("/");
    setUser(null);
    window.location.reload();

  }

  useEffect(() => {
    const token = user?.token;

    if(token){
      
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();

    }

    setUser(JSON.parse(localStorage.getItem("profile")));

  }, [location])

  return (
    <>
        <AppBar position="fixed" sx={{backgroundColor:"#191970"}}>
          <Toolbar sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
               
                    
            <Stack direction="row" spacing={1} alignItems="center">
                <img src={require("../images/carIcon.png")} style={{height:"80px",width:"80px"}}/>
                <Typography sx={{fontSize:"23px",fontWeight:"bold",fontFamily:"cursive"}}> Department of Motor Traffic </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              
                {!user ? 
                
                <Button component={Link} to="/auth" variant="contained" color="primary" size="small">
                  Log In
                </Button>
              :
                <Button onClick={logout} variant="contained" color="primary" size="small">
                  Log Out
                </Button>
              }

              { user ?  
                <Avatar alt={user.result.name} src={user.result.imageUrl}> {user.result.name.split(' ')[0][0]}{user.result.name.split(' ')[1][0]} </Avatar>  
                :
                <Avatar>
                  <PersonOffOutlinedIcon/>
                </Avatar>
              }
            </Stack>             
          </Toolbar>
        </AppBar>
    </>
  )
}

export default NavBar