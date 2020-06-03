const mongoose = require("mongoose");

// - Creating Schema for database - \\
const postSchema = new mongoose.Schema({
    title: String,
    author: {
        type: String,
        required: true,
        ref: 'User'
    },
    content: String,
    date: { type: Date, default: Date.now },
    published: Boolean,
    images: [],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
},
    { timestamps: true }

)

// - Compiling mongoose Schema to a Model - \\
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
