const db = require("../models");
const Post = db.post;


// Create and Save a new Tutorial
exports.createPost = (req, res) => {
    // Validate request
    console.log("Post CreatePost:", req.currentUser)
    // console.log(req)
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    //Write LOGIC if IMAGES ARE INLCLUDED DURING CREATE
    // Create a new function altogether and call it here

    // Create a Post
    console.log("DEBUG: REQ BODY:", req.body);
    const post = new Post({
        title: req.body.title,
        author: req.currentUser,
        content: req.body.content,
        published: req.body.published ? req.body.published : false
    });

    // Save Post in the database
    post.save(post)
        .then(data => {
            console.log("Post Saved:")
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });
};


// Retrieve all Post from the database. 
// can be modified later We use req.query.title to get query string from the Request and consider it as condition for findAll() method
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    //rjoshi added .populate("comments") to get the comment text in the Post
    Post.find(condition).populate("comments")
        .then(data => {
            //  console.log("DEBUG: ", data)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Post with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Post with id=" + id });
        });
};

// Update a Post  by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Post with id=${id}. Maybe Post was not found!`
                });
            } else res.send({ message: "Post was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Post with id=" + id
            });
        });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            } else {
                res.send({
                    message: "Post was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Post.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Post were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all posts."
            });
        });
};

// Find all published Posts
exports.findAllPublished = (req, res) => {
    Post.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Posts."
            });
        });
};
