const { authJwt } = require("../middlewares");

module.exports = app => {
    const posts = require("../controllers/post.controller.js");

    var router = require("express").Router();

    // Create a new Post
    router.post("/", [authJwt.verifyToken], posts.createPost);  //rjoshi fucntion here is controller
    // router.post("/", posts.createPost);
    // Retrieve all Post
    router.get("/", posts.findAll);

    // Retrieve all published Post
    router.get("/published", posts.findAllPublished);

    // Retrieve a single Post with id
    router.get("/:id", posts.findOne);

    // Update a Post with id
    router.put("/:id", posts.update);

    // Delete a Post with id
    router.delete("/:id", posts.delete);

    // Create a new Post
    router.delete("/", posts.deleteAll);

    //This acts as a root mount point rjoshi
    app.use("/api/v1/posts", router);
};
