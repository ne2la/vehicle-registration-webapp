import { FETCH_POST,FETCH_ALL,CREATE,UPDATE,DELETE,START_LOADING,END_LOADING,FETCH_PLATE_fORM,FETCH_PLATE_VALIDITY } from '../constants/actionTypes';
import * as api from '../api'


export const getPost = (id) => async (dispatch) => {

    try {
        dispatch( {type: START_LOADING} );

        const { data } = await api.fetchPost(id);
        dispatch({type:FETCH_POST, payload:data });

        dispatch( {type: END_LOADING} );

    } catch (error) {
        console.log(error.message)
    }

}

export const getPlateForm = (plateNo,postData) => async (dispatch) => {

    try {
        dispatch( {type: START_LOADING} );

        const { data } = await api.getPlateForm(plateNo);
        postData.vehType = data;
        dispatch({type:FETCH_PLATE_fORM, payload:data });

        dispatch( {type: END_LOADING} );

    } catch (error) {
        console.log(error.message)
    }

}

export const validateNumberPlate = (plateNo) => async (dispatch) => {

    try {
        dispatch( {type: START_LOADING} );

        const { data } = await api.validateNumberPlate(plateNo);
        dispatch({type:FETCH_PLATE_VALIDITY, payload:data });

        dispatch( {type: END_LOADING} );

    } catch (error) {
        console.log(error.message)
    }

}


export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch( {type: START_LOADING} );

        const { data } = await api.fetchPosts(page);
        dispatch({type:FETCH_ALL, payload:data });

        dispatch( {type: END_LOADING} );

    } catch (error) {
        console.log(error.message)
    }

}

export const createPost = (post,navigate) => async (dispatch) => {

    try {
        dispatch( {type: START_LOADING} );
        const { data } = await api.createPost(post);

        navigate(`/posts/${data._id}`);

        dispatch({ type: CREATE, payload:data });

    } catch (error) {
        console.log(error);
    }

}

export const updatePost = (id,post) => async (dispatch) => {

    try {
        const { data } = await api.updatePost(id,post);
        dispatch({ type: UPDATE, payload:data });

    } catch (error) {
        console.log(error);
    }

}

export const deletePost = (id) => async (dispatch) => {

    try {
        await api.deletePost(id);
        dispatch({type:DELETE,payload:id});

    } catch (error) {
        console.log(error);        
    }

}


