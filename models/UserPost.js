const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userPost = new Schema(
    {
        uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        posts: [{ types: mongoose.Schema.Types.ObjectId, ref: "Post" }],

    },

);

const UserPost = mongoose.model("UserPost", userPost);

module.exports = UserPost;