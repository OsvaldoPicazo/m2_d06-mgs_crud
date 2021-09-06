// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router();

// ********* require Book model in order to use it *********
const Book = require('../models/Book.model');
// ********* require Book model in order to use it *********
const Author = require('../models/Author.model');

// When routing, use the inverted pyramid rule: route from the most specific to the least specific route

router.get(
  "/new",
  (req, res)=>{
    Author.find()
    .then(authors => {
      res.render("new-book", {authors});
    })
    .catch(err => console.log(err));
})

// This is the twin routes way that we saw on the express routes lesson
/* router.route("/new")
.get((req, res)=>{
  res.render("new-book")
})
.post((req, res)=>{
  // Create entity here
}) */

// but instead we will follow a strong convention a post data no using twin routes

// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************
router.get("/:id", (req, res) => {
  Book.findById(req.params.id) 
    .populate("author")   // populate author object to make it an accesible object
    .then((book) => {
      res.render('book-details', book)
    })
})

// ****************************************************************************************
// GET route for deleting a book
// ****************************************************************************************

// Problem: HTML only takes GET and POST request:
/*
router.delete("/:id", (req, res)=>{
  res.send(`Deleted book ${req.params.id}`)
})
*/

// Solution: implement the delete method as an URL path and delete with mongoose method

router.get("/:id/delete",(req, res)=>{
  Book.findByIdAndDelete(req.params.id)
  .then(deletedBook => res.redirect("/books"))
  .catch(error=> console.log(error))
})


// ****************************************************************************************
// GET route for editing a book
// ****************************************************************************************

// Problem:The HTML interface does not allow the delete verb to be sent in a request
/*
router.put("/:id", (req, res)=>{
  res.send(`Edited book ${req.params.id}`)
})
*/

//Solution
router.route("/:id/edit")
.get((req, res)=>{
  Book.findById(req.params.id)
  .then(book => res.render("book-edit", book))
  // {data} curly braces only needed when passing an array
})
.post((req, res)=>{
  const {title, author, description, rating} = req.body
  Book.findByIdAndUpdate(
    req.params.id,
    {title, author, description, rating}
  )
  .then(updateBook => res.redirect(`/books/${req.params.id}`))
  .catch(error => console.log(error))
})

// ****************************************************************************************
// GET route to display all the books
// ****************************************************************************************
  

// This is the base path of the DB entity
router.get('/', 
(req, res) => {
  Book.find()
  .then(books => {
    res.render('books-list', {books})
  })
   // You have to continue coding the route
});
  
router.post(
  "/",
  (req, res)=>{
  const {title, author, description, rating} = req.body
  Book.create({title, author, description, rating})
  .then(newBook => res.redirect("/books/"))
})

module.exports = router;
