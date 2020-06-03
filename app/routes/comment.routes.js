

const { authJwt } = require("../middlewares");

module.exports = app => {
    const comments = require("../controllers/comment.controller.js");

    var router = require("express").Router();

    // Create a new Post
    router.post("/", [authJwt.verifyToken], comments.createComment);  //rjoshi fucntion here is controller
    // router.post("/", posts.createPost);
    // Retrieve all Post
    //  router.get("/", comments.findAll);

    //This acts as a root mount point rjoshi

    //router.get("/", comments.findAll);

    // Retrieve all published Post





    app.use("/api/v1/comments", router);
};




// // router.post('/:article/comments', auth.required,
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