import React,{ useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { Pagination, PaginationItem } from '@mui/material'

const Paginate = ({page}) => {
  
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if(page) dispatch(getPosts(page))
  },[page]);

  return (
    <>
        <Pagination
            sx={{justifyContent:"space-around"}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            shape="rounded"
            size="small"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} sx={{color:"#808080",borderColor:"white",fontWeight:"bold",":hover":{color:"black"}}}/>
            )}
        />
        
    </>
  )
}

export default Paginate