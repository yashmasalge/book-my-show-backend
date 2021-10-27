// MAIN BACKEND FILE
const { json } = require('express');
// const db = require("./database/index");
require("dotenv").config();
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");

// CORS
var cors = require('cors');

//mongoose connection
const connectDB = require("./connection.js");

//mongoose model
const MoviesModel = require("./movies");
// const authorModel = require("./author");
// const publicationModel = require("./publication");

const app = express();


// using json for post
app.use(express.json());

// USing CORS
app.use(cors());

// http://localhost:3000/
app.get("/",async (req, res) => {
    try{
        const getAllMovies = await MoviesModel.find();
        return res.json(getAllMovies);
     }
     catch(e){
         return res.status(500).json({e : e.Message});
     }
});

// http://localhost:5000/movies
app.get("/movies",async (req, res) => {
     try{
        const getAllMovies = await MoviesModel.find();
        return res.json(getAllMovies);
     }
     catch(e){
         return res.status(500).json({e : e.Message});
     }
});

// http://localhost:5000/movies/:_id
app.get("/movies/:_id",async (req,res) => {
try{
    const {_id} = req.params;
    const getSingleMovie = await MoviesModel.findOne({_id : _id});
    if(getSingleMovie === null){
        return res.json("Error");
    }
    return res.json(getSingleMovie);

}
catch(error){
    return res.status(500).json({error : error.Message});
}
});

// http://localhost:5000/movie-register
app.post("/movie-register",async (req,res) => {
    try{
        const {newMovie} = req.body;
        console.log(newMovie)
        await MoviesModel.create(newMovie);
        return res.json({newMovie});
    }
    catch(error){
        return res.status(500).json({error : error.Message});
    }
})

// // http://localhost:3000/book-isbn/12345Two
// app.get("/book-isbn/:isbn",async (req, res) => {
//     try{
//         // console.log(req.params);
//     const {isbn} = req.params;
//     console.log(isbn);
//     const getSpecificBook = await bookModel.findOne({ISBN : isbn})
//     console.log(getSpecificBook);
//     // console.log(getSpecificBook.length);
//     if(!getSpecificBook){
//         return res.json({Message : "No data Found"});
//     }
//     return res.json({getSpecificBook});
//     }
//     catch(e){
//         return res.status(500).json({e : e.Message});
//     }
// });

// // http://localhost:3000/book-category/programming
// app.get("/book-category/:category",async (req, res) => {
//     try{// // console.log(req.params);
//         const {category} = req.params;
//         // // console.log(isbn);
//         const getSpecificBooks = await bookModel.find({category : category})
//         // // console.log(getSpecificBook);
//         // // console.log(getSpecificBook.length);
//         if(!getSpecificBooks) {
//             return res.json({"error": `No Books found for the category of ${category}`});
//         }
//         return res.json(getSpecificBooks);}
//         catch(e) {

//         }res.json("Error");
    
// });

// // http://localhost:3000/authors
// app.get("/authors",async (req, res) => {
//     try{
//         const getAllAuthors = await authorModel.find()
//     return res.json(getAllAuthors);
//     }
//     catch(e){
//         res.json("Error")
//     }
// });

// // http://localhost:3000/author-id/1
// app.get("/author-id/:id", (req, res) => {
//     // console.log(req.params);
//     let {id} = req.params;
//     id = Number(id);
//     // console.log(id);
//     const getSpecificAuthor = db.authors.filter((author) => author.id === id);
//     // console.log(getSpecificAuthor);
//     // console.log(getSpecificAuthor.length);
//     if(getSpecificAuthor.length===0) {
//         return res.json({"error": `No Author found for the id of ${id}`});
//     }
//     return res.json(getSpecificAuthor[0]);
// });

// // http://localhost:3000/author-isbn/12345Two
// app.get("/author-isbn/:isbn", (req, res) => {
//     const {isbn} = req.params;
//     const getSpecificAuthor = db.authors.filter((author) => author.books.includes(isbn));
//     if(getSpecificAuthor.length===0) {
//         return res.json({"error": `No Author found for the id of ${isbn}`});
//     }
//     return res.json(getSpecificAuthor);
// });

// // http://localhost:3000/publications
// app.get("/publications", (req, res) => {
//     const getAllPublications = db.publications;
//     return res.json(getAllPublications);
// });

// // http://localhost:3000/publication-isbn/12345Two
// app.get("/publication-isbn/:isbn", (req, res) => {
//     const {isbn} = req.params;
//     const getISBNPublications = db.publications.filter((publication) => publication.books.includes(isbn));
//     if(getISBNPublications.length===0) {
//         return res.json({"error": `No Author found for the id of ${isbn}`});
//     }
//     return res.json(getISBNPublications);
// });

//creating a port at 5000
app.listen(process.env.PORT || 5000,() =>
 connectDB().then((data) =>
 console.log("Server started successfully"))
 .catch((error) => console.log(error))
 );  