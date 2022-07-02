import mongoose  from "mongoose";
import PostDetails from "../models/postDetails.js";


export const getPost = async (req,res) => {
    const { id } = req.params;
    
    try {
        const post = await PostDetails.findById(id);
        res.status(200).json(post);

    } catch (error) {
        res.status(404).json({ message: error.message});
    }

}

export const getPosts = async (req,res) => {

    const { page } = req.query

    try {

       const LIMIT = 4;
       const startIndex = (Number(page) - 1) * LIMIT;
       const total = await PostDetails.countDocuments({}); 

       const posts = await PostDetails.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex)
         
       res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req,res) => {
    
    const post = req.body; 
    const newPost = new PostDetails({...post, creator:req.userId, createAt: new Date().toISOString()});

    try {
         await newPost.save();

         res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req,res) => {
    const { id: _id } = req.params; 
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const updatePost = await PostDetails.findByIdAndUpdate(_id,{...post,_id},{ new:true});

    res.json(updatePost);
}

export const deletePost = async (req,res) => {

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    await PostDetails.findByIdAndRemove(id);

    res.json({message: "Post deleted successfully"});

}

export const getPlateForm = async (req,res) => {

    const plateName = req.body.plateNo.replace(/\s/g, "");

    const vintagePattern = /^[0-9]{1,2}ශ්‍රී[0-9]{1,4}$/gi
    const oldPattern = /^[0-9]{2,3}-*[0-9]{4}$/gi
    const modernPattern = /^[A-Z]{2,5}-[0-9]{4}$/gi

    if(plateName.match(oldPattern)){
        res.status(200).json("Old");
    }else if(plateName.match(modernPattern)){
        res.status(200).json("Modern");
    }else if(plateName.match(vintagePattern)){
        res.status(200).json("Vintage");
    }else{
        res.status(200).json("Invalid Plate");
    }
}

export const validateNumberPlate = async (req,res) => {

    const plateName = req.body.plateNo.replace(/\s/g, "");

    const vintagePattern = /^[0-9]{1,2}ශ්‍රී[0-9]{1,4}$/gi
    const oldPattern = /^[0-9]{2,3}-*[0-9]{4}$/gi
    const modernPattern = /^[A-Z]{2,5}-[0-9]{4}$/gi
    
    if(plateName.match(oldPattern) || plateName.match(modernPattern) || plateName.match(vintagePattern)){
        res.status(200).json(true);
    }else{
        res.status(200).json(false);
    }    
}

