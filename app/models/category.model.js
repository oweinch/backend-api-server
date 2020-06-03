//one to many - one category can have many posts. Using reference because more post writes 

const mongoose = require("mongoose");

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        name: String,
        description: String
    })
);

module.exports = Category;