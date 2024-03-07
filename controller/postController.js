const { uploadFile, getObjectSignedUrl, getAllFilesInDirectory } = require('../utils/s3');
const uuidv4 = require('uuid').v4;
const Post =require( '../models/PostSchema');
// const { uploadFile } = require('../utils/s3');
exports.addPost = async (req, res) => {
    try {            

        const { title, description, author } = req.body;
        let pid =uuidv4()
        const post = new Post({ pid,title, description, author });
        
        console.log("file",req.file);
        let filename = uuidv4();
        let key=`u123/${pid}/${filename}`
        await uploadFile(req.file.buffer, key, req.file.mimetype)
        savedPost = await post.save();

        savedPost = await post.save();
        return res.status(200).json({ "Post added": savedPost });
    } catch (error) {
        if (error.name === 'ValidationError') {
          
            console.log("eeeee",error.name)
            const validationErrors = Object.entries(error.errors).map(([name, errorObject]) => ({
                [name]: errorObject.message,
            }));            
        
            return res.status(400).json({ errors: validationErrors });

        }
        else{
            return res.status(500).json({  error: error });
        }
       
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().lean();
        console.log("posts",posts)

        return posts.map(post => ({
            ...post,
            media: getAllFilesInDirectory(`/u123/${post.pid}`)
        }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({  error: "Internal Server Error" });
    }
};

exports.getSinglePost = async (req, res) => {
    try {
      
      
        const post = await Post.find({_id : req.params.id});
        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({  error: "Internal Server Error" });
    }
};