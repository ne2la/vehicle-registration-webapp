import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    regNo: String,
    creator: String,
    vehType: String,
    name: String,
    chassisNo: String,
    engineNo: String,
    ownerName: String,
    vehImage: String,
    fuel: String,
    model: String,
    vehClass: String,
    mvTax: String,
    createdAt: {
        type: Date,
        default: new Date() 
    }
});

const PostDetails = mongoose.model('PostDetails', postSchema);

export default PostDetails;