import { Box, Paper, Stack, TextField,Grid, Button, Divider, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FileBase from "react-file-base64"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import {updatePost,createPost,getPlateForm,validateNumberPlate} from "../../actions/posts"
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Link } from 'react-router-dom';

const StyledTextField = styled(TextField)(({ theme }) => ({
    width:"300px",
    backgroundColor:"white",
    borderRadius:"10px"
  }));

const Form = ({currentId,setCurrentId}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const {plateValidity}  = useSelector((state) => state.posts);
    
    const[postData,setPostData] = useState({
        regNo:'',vehType:'',vehClass:'',fuel:'',chassisNo:'',model:'',
        engineNo:'',ownerName:'',
        vehImage:'',mvTax:''
      });

    
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId ): null);

    useEffect(() => {
        if(post) setPostData(post);
    
      }, [post]);

    const handleSubmit = (e) => {

        e.preventDefault();
        
        if(currentId){
            dispatch(updatePost(currentId,{...postData, name: user?.result?.name }))
        }else{
            dispatch(createPost({...postData, name: user?.result?.name },navigate));
        }

        clear();
        
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            regNo:'',vehType:'',vehClass:'',fuel:'',chassisNo:'',model:'',
            engineNo:'',ownerName:'',
            vehImage:'',mvTax:''
        })
    }

    const [isUserSign,setIsUserSign] = useState(false);

    useEffect(() => {
        if(user?.result?.name){
          setIsUserSign(true)
        }
    }, [])

    const getVehicleForm = () => {
        dispatch(getPlateForm({plateNo: postData.regNo},postData));
        dispatch(validateNumberPlate({plateNo: postData.regNo}));
    }

    useEffect(() => {
        getVehicleForm();
    }, [postData.regNo])

  return (
    <>
        <form autoComplete='off' sx={{padding:2}} onSubmit={handleSubmit}>

            <Paper sx={{padding:5,marginTop:2,height:"auto",width:"800px",backgroundColor:"transparent",border:"1px solid white",borderRadius:"10px"}} elevation={6}>

                <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",gap:"10px",paddingBottom:2}}>

                    <StyledTextField required={true} name='registrationNo' variant="filled" size='small' label="Registration No." 
                        value={postData.regNo}
                        onChange={(e) => setPostData({ ...postData,regNo: e.target.value })}
                        
                    />
                    
                    {isUserSign &&
                        <>
                        <Stack direction="row" spacing={1} alignItems="center">
                            
                            {plateValidity ?
                                <CheckCircleRoundedIcon style={{color:"#00FF00",width:'20px',height:'20px'}}/>
                                :
                                <CancelIcon style={{color:"red",width:'20px',height:'20px'}}/>
                            }
                            
                            
                        </Stack>
                        </>

                    }

                </Box>

                <Divider/>

                <Grid container spacing={2} sx={{paddingTop:2}}>

                <Grid item xs={6}>
                    <Stack spacing={2}>

                        <StyledTextField size='small' required={true} name='type' variant='filled' label="License Plate Form" 
                            value={postData.vehType}
                            InputProps={{readOnly: true, disableUnderline: true}}
                            
                        />
                    
                        <StyledTextField
                            id="chassisNo"
                            required
                            label="Chassis No."
                            size='small'
                            variant='filled'
                            value={postData.chassisNo}
                            onChange={(e) => setPostData({ ...postData,chassisNo: e.target.value })}
                        />

                        <StyledTextField
                            variant='filled'
                            id="engineNo"
                            required
                            label="Engine No."
                            size='small'
                            value={postData.engineNo}
                            onChange={(e) => setPostData({ ...postData,engineNo: e.target.value })}
                        />

                        <StyledTextField
                            variant='filled'
                            size='small'
                            id="ownerName"
                            required
                            label="Owner Name"
                            value={postData.ownerName}
                            onChange={(e) => setPostData({ ...postData,ownerName: e.target.value })}
                        />

                    </Stack>
                </Grid>

                <Grid item xs={6}>
                    <Stack spacing={2}>

                        <StyledTextField
                            variant='filled'
                            size='small'
                            id="vehicleClass"
                            required
                            label="Vehicle Class"
                            value={postData.vehClass}
                            onChange={(e) => setPostData({ ...postData,vehClass: e.target.value })}
                        />

                        <StyledTextField
                            variant='filled'
                            size='small'
                            id="fuel"
                            required
                            label="Fuel"
                            value={postData.fuel}
                            onChange={(e) => setPostData({ ...postData,fuel: e.target.value })}
                        />

                        <StyledTextField
                            variant='filled'
                            size='small'
                            id="model"
                            required
                            label="Model"
                            value={postData.model}
                            onChange={(e) => setPostData({ ...postData,model: e.target.value })}
                        />

                        <StyledTextField
                            variant='filled'
                            size='small'
                            id="mvTax"
                            required
                            label="Mv Tax Upto"
                            value={postData.mvTax}
                            onChange={(e) => setPostData({ ...postData,mvTax: e.target.value })}
                        />

                    </Stack>
                </Grid>

                <Grid item xs={6}>
                    <Box sx={{backgroundColor:"white",width:"190px",height:"40px",display:"flex",alignItems:"center",borderRadius:"10px",paddingLeft:"10px"}}>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setPostData({ ...postData,vehImage:base64})}
                        />
                    </Box>
                </Grid>

                <Grid item xs={6}>

                    <Stack direction="row" gap={1}>

                        {isUserSign ?
                        <>
                        { plateValidity &&
                        <Button variant="contained" color="primary" type="submit">
                            Register
                        </Button>
                        }

                        <Button variant="contained" color="primary" onClick={clear}>
                            Clear
                        </Button>
                        </>
                        :
                        <Button component={Link} to="/auth" variant="contained" color="primary">
                            Please Log In First
                        </Button>
                        }

                    </Stack>

                </Grid>

            </Grid>  

           
            </Paper>      

        </form>
    </>
  )
}

export default Form