const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        dob: { type: Date, required: true },      
    },
);


const Post = new Schema(
    {
        // postId: { type: Schema.Types.ObjectId , required: true },
        title: { type: String, required: [true,'Title cannot be empty'] },
        description: { type: String, required: [true,'Description cannot be empty'] },
        author: { type: String,  required: [true,'Author cannot be empty'] },
        image: {
            data: Buffer, // Store image data as buffer
            contentType: String, // Store image contentType
        },
    },
    
    { timestamps: true }
);


module.exports = {
    User: mongoose.model("User", User),
    Post: mongoose.model("Post", Post),
};
