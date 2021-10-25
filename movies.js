const mongoose = require("mongoose");

const movieSchema  = new mongoose.Schema({
    imageurl : String,
    title : String,
    actor : String
});


const MoviesModel =  mongoose.model("movies",movieSchema);

module.exports = MoviesModel; 