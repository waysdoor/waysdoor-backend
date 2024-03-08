const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const post = new Schema(
    {
        pid: { type: String,required: true},
        title: { type: String, required: [true, 'Title cannot be empty'] },
        description: { type: String, required: [true, 'Description cannot be empty'] },
        author: { type: String, required: [true, 'Author cannot be empty'] },
        likes: { type: Number },
        created: { type: Date }
    },

);

const Post = mongoose.model("Post", post);
module.exports = Post;