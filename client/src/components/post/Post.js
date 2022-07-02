import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button, ButtonBase, CardActions, Stack, styled, Typography } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PersonIcon from '@mui/icons-material/Person';
import UpdateIcon from '@mui/icons-material/Update';
import CategoryIcon from '@mui/icons-material/Category';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import {deletePost} from "../../actions/posts"
import "./styles.css";
import {useNavigate} from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({

    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:"5px",
    justifyContent:"left"

}));

const StyledTypography = styled(Typography)(({ theme }) => ({

    fontSize:"15px",
    fontWeight:"bold",
    fontFamily:"monospace"

}));

const Post = ({post,setCurrentId}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const onClickEdit = () => {
    setCurrentId(post._id)
  }

  const onClickDelete = () => {
    dispatch(deletePost(post._id))
    alert("Successfully deleted")
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`)
  }

  return (
    <>
        <Card sx={{ width: 345, ":hover":{border:"2px solid #808080" }}} elevation={6}>

            <CardMedia
                component="img"
                height="140"
                image={post.vehImage}
                alt="green iguana"
            />

            <Box sx={{cursor:"pointer"}} onClick={openPost}>

            <CardContent>

                <Stack direction="column" spacing={2}>

                    <StyledBox>

                        <ConfirmationNumberIcon className='icons'/>
                        <StyledTypography>
                            Registration No. - {post.regNo}
                        </StyledTypography>
                    </StyledBox>

                    <StyledBox>

                        <CategoryIcon className='icons'/>
                        <StyledTypography>
                            Vehicle Type - {post.vehType}
                        </StyledTypography>
                    </StyledBox>

                    <StyledBox>

                        <LocalGasStationIcon className='icons'/>
                        <StyledTypography>
                            Fuel - {post.fuel}
                        </StyledTypography>

                    </StyledBox>

                    <StyledBox>

                        <PersonIcon className='icons'/>
                        <StyledTypography>
                            Owner Name - {post.ownerName}
                        </StyledTypography>
                    </StyledBox>

                    <StyledBox>

                        <CardMembershipIcon className='icons'/>
                        <StyledTypography>
                            Model - {post.model}
                        </StyledTypography>
                    </StyledBox>

                    <StyledBox>

                        <CreditCardIcon className='icons'/>
                        <StyledTypography>
                            MV Tax - {post.mvTax}
                        </StyledTypography>
                    </StyledBox>

                    

                </Stack>

            </CardContent>   

            </Box>

            <CardActions>

                {(user?.result?._id === post?.creator) &&  (

                <Stack direction="row" spacing={2} sx={{paddingBottom:1}}>

                
                    <Button onClick={onClickEdit} variant="outlined" startIcon={<UpdateIcon />} size="small">
                        Update
                    </Button>
                    

                    <Button color="error" onClick={onClickDelete} variant="outlined" startIcon={<DeleteIcon />} size="small">
                        Delete
                    </Button>
                </Stack>

                )}    
            </CardActions>   
        </Card>
    </>
  )
}

export default Post