import React, { useState } from 'react'
import CardMedia from '@mui/material/CardMedia'
import { Box, Paper, Typography } from '@mui/material'
import Form from '../form/Form'
import Posts from '../posts/Posts'
import {useLocation} from "react-router-dom"
import Pagination from '../pagination/Pagination'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const[currentId,setCurrentId] = useState(null);

    const query = useQuery();
    const page = query.get('page') || 1;

  return (
    <>
    <Box>

        <CardMedia title="" image="https://images.unsplash.com/photo-1614540681890-13f2536d5fba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMGNhcnxlbnwwfHwwfHw%3D&w=1000&q=80" sx={{width:"100%",height:"100vh",position:"relative"}}/>
        
        
        <Box sx={{position:"absolute",top:140,left:"20%",textAlign:"center"}}>

            <Typography sx={{fontSize:"30px",color:"white",fontFamily:"cursive",fontWeight:"bold"}}> Welcome to LK Vehicle Registration </Typography>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>

        </Box>
        

        <Box sx={{height:"auto",paddingBottom:"60px"}}>

          <Typography sx={{fontSize:"30px",color:"black",fontFamily:"cursive",fontWeight:"bold",textAlign:"center",paddingTop:2}}>
            Registered Vehicle 
          </Typography>

          <Box sx={{paddingTop:4}}>
            <Posts setCurrentId={setCurrentId}/>
          </Box>

          <Paper elevation={6} sx={{width:"full",borderRadius:4,marginTop:"1rem",padding:"12px",boxShadow:"1px 1px 1px 1px #191970",backgroundColor:"#fff"}}>
                <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",justifyItems:"center"}}>
                  <Pagination page={page}/>
                </Box>
          </Paper>

        </Box>
        
    </Box>
        
    </>
  )
}

export default Home