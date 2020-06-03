const mongoose = require("mongoose");

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        postid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        username: {
            type: String,
            required: true,
            ref: "User"
        },
        text: String,
        date: { type: Date, default: Date.now },
    })
);

module.exports = Comment;







// const createComment = function(tutorialId, comment) {
//     return db.Comment.create(comment).then(docComment => {
//       console.log("\n>> Created Comment:\n", docComment);

//       return db.Tutorial.findByIdAndUpdate(
//         tutorialId,
//         { $push: { comments: docComment._id } },
//         { new: true, useFindAndModify: false }
//       );
//     });
//   };
