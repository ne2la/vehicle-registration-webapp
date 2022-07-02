import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {getPost} from "../../actions/posts"
import { Paper,Typography, CircularProgress,Container, Grid, Button} from "@mui/material"
import {styled} from "@mui/material/styles"
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom'
import "./styles.css"

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize:"17px",
  fontWeight:"bold",
  fontFamily:"monospace"
}));

const PostDetails = () => {

  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(getPost(id));
  },[id]);

  if(!post) return null;

  if(isLoading) {
    return(
      <Paper sx={{display:"flex", justifyContent:"center",alignItems:"center",padding:"20px",borderRadius:"15px",height:"39vh"}} elevation={6}>
        <CircularProgress size="7em"/>
      </Paper>
    )
  } 

  return (
    
    <>
      <Container maxWidth="md">

        <Paper elevation={6} sx={{marginTop:"120px",paddingBottom:"50px",padding:2,marginBottom:"50px"}}>

            <img style={{borderRadius:"20px",objectFit:"cover",width:"100%",maxHeight:"400px"}} src={post.vehImage} alt={post.model} />

            <Grid container spacing={2} justifyContent="normal" sx={{paddingTop:3}}>
            
                <Grid item xs={6} sx={{paddingLeft:3}}>
                    <StyledTypography>
                         Registration No. - <span className='details'>{post.regNo} </span> 
                    </StyledTypography>
                    <StyledTypography> Vehicle Type - <span className='details'> {post.vehType}  </span></StyledTypography>
                    <StyledTypography> Chassis No. - <span className='details'> {post.chassisNo} </span> </StyledTypography>
                    <StyledTypography> Owner Name - <span className='details'> {post.ownerName} </span> </StyledTypography>
                    <StyledTypography> Vehicle Class - <span className='details'> {post.vehClass} </span> </StyledTypography>
                </Grid>

                <Grid item xs={6} align="left">
                    <StyledTypography> Fuel - <span className='details'>{post.fuel}</span> </StyledTypography>
                    <StyledTypography> Model - <span className='details'>{post.model} </span></StyledTypography>
                    <StyledTypography> MV Tax - <span className='details'>{post.mvTax}</span></StyledTypography>
                    <StyledTypography> Engine No. - <span className='details'> {post.engineNo} </span> </StyledTypography>
                </Grid>
        
            </Grid>

            <a href='/posts' style={{textDecoration:'none'}}>
            <Button variant="outlined" startIcon={<HomeIcon />} size="small" sx={{marginTop:2}}>
                Home
            </Button>
            </a>

        </Paper>
        
      </Container>
    </>

  )
}

export default PostDetails
