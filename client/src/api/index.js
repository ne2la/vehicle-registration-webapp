import axios from 'axios';

const API = axios.create({ baseURL:"https://vehicle-registration-ne2la.herokuapp.com/" });

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
})

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const getPlateForm = (plateNo) => API.post("/posts/plateForm",plateNo);
export const validateNumberPlate = (plateNo) => API.post("/posts/validateNumberPlate",plateNo);

export const createPost = (newPost) => API.post("/posts/createPost", newPost);
export const updatePost = (id,updatedPost) => API.patch(`/posts/updatePost/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`posts/deletePost/${id}`);

export const signin = (formData) => API.post("/user/signin",formData);
export const signUp = (formData) => API.post("/user/signup",formData);
