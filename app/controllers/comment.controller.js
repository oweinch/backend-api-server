const db = require("../models");
const Comment = db.comment;
const Post = db.post;

// Create and Save a new Tutorial
exports.createComment = (req, res) => {
    // Validate request
    console.log("createComment:", req.currentUser)
    if (!req.body.text) {
        res.status(400).send({ message: "Comments can not be empty!" });
        return;
    }

    const comment = new Comment({
        postid: req.body.postid,
        username: req.currentUser,
        text: req.body.text,
    });



    comment.save(comment)
        .then(docData => {
            console.log("DEBUG: Comments Saved:", docData)
            Post.findByIdAndUpdate(docData.postid,
                { $push: { comments: docData._id } },
                { new: true, useFindAndModify: false }
            )
                .then(data => {
                    if (!data) {
                        res.status(400).send({ message: `Cannot find post with id=${postId}. No comments Updated in Post Document` })
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: ` Error updating Post postid=${postId} for comments` })
                })

            //rjoshi: You can probably send response to api endpoint to post routes
            res.send(docData);

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comments."
            });
        });





    // Post.findByIdAndUpdate(req.body.postId, 
    //     { $push: {comments}}


    //     )




};

// // Retrieve all Post from the database. 
// // can be modified later We use req.query.title to get query string from the Request and consider it as condition for findAll() method
// exports.findAll = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

//     Post.find(condition)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving tutorials."
//             });
//         });
// };

// // Find a single Post with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     Post.findById(id)
//         .then(data => {
//             if (!data)
//                 res.status(404).send({ message: "Not found Post with id " + id });
//             else res.send(data);
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .send({ message: "Error retrieving Post with id=" + id });
//         });
// };

// // Update a Post  by the id in the request
// exports.update = (req, res) => {
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Data to update can not be empty!"
//         });
//     }

//     const id = req.params.id;

//     Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot update Post with id=${id}. Maybe Post was not found!`
//                 });
//             } else res.send({ message: "Post was updated successfully." });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Post with id=" + id
//             });
//         });
// };

// // Delete a Post with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
//                 });
//             } else {
//                 res.send({
//                     message: "Post was deleted successfully!"
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Post with id=" + id
//             });
//         });
// };

// // Delete all Posts from the database.
// exports.deleteAll = (req, res) => {
//     Post.deleteMany({})
//         .then(data => {
//             res.send({
//                 message: `${data.deletedCount} Post were deleted successfully!`
//             });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all posts."
//             });
//         });
// };

// // Find all published Posts
// exports.findAllPublished = (req, res) => {
//     Post.find({ published: true })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving Posts."
//             });
//         });
// };
