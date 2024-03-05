const { User, Post } = require('../models');
// const { uploadFile } = require('../utils/s3');
exports.addPost = async (req, res) => {
    try {            

        const { title, description, author } = req.body;
        const post = new Post({ title, description, author });
        console.log("file",req.file);
        post.image.data = req.file.buffer;
        // await uploadFile(req.file.buffer, imageName, req.file.mimetype)
        savedPost = await post.save();
        return res.status(200).json({ "Post added": savedPost });
    } catch (error) {
        if (error.name === 'ValidationError') {
          
            console.log("eeeee",error.name)
            const validationErrors = Object.entries(error.errors).map(([name, errorObject]) => ({
                [name]: errorObject.message,
            }));            
            console.log("asdasdasdasdasd",validationErrors)
            return res.status(400).json({ errors: validationErrors });

        }
        else{
            return res.status(500).json({  error: "Internal Server Error" });
        }
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
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