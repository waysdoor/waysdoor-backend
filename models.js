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
        title: { type: String, required: [true,'Title cannot be empty'] },
        description: { type: String, required: [true,'Description cannot be empty'] },
        author: { type: String,  required: [true,'Author cannot be empty'] },
        image: {
            data: Buffer, 
            contentType: String,
        },
        likes:{type:Number},
        created: { type: Date}
    },
    
);


const Chat = new Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },

);


const UserChat = new Schema(
    {
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }]
       
      
    },

);

module.exports = {
    User: mongoose.model("User", User),
    Post: mongoose.model("Post", Post),
    Chat: mongoose.model("Chat", Chat),
};
