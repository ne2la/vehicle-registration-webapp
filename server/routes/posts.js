import express from 'express';
import { getPosts, createPost, updatePost, deletePost,getPost,getPlateForm,validateNumberPlate } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id',getPost);
router.get('/',getPosts);
router.post('/createPost',auth,createPost);
router.patch('/updatePost/:id',auth,updatePost);
router.delete('/deletePost/:id',auth,deletePost);

router.post('/plateForm',getPlateForm)
router.post('/validateNumberPlate',validateNumberPlate)

export default router;