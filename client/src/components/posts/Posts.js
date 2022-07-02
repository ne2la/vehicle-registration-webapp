import { Grid,CircularProgress } from '@mui/material'
import React from 'react'
import Post from '../post/Post'
import { useSelector } from 'react-redux';

const Posts = ({setCurrentId}) => {

    const { posts, isLoading } = useSelector((state) => state.posts);

    if (!posts.length && !isLoading) return "Not Founded";

  return (
    
        isLoading ? <CircularProgress/> : (
        <Grid container spacing={2} justifyContent="normal">
            
            {posts.map((post) => (
                <Grid item xs={3} key={post._id} align="center">
                    <Post post={post} setCurrentId={setCurrentId}/>  
                </Grid>
            ))
            }
        </Grid>
        )
  )
}

export default Posts