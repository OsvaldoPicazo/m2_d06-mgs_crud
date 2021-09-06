// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const router = express.Router(); // This is the Router class inside the Express library

// ********* require Book model in order to use it *********
const Book = require('../models/Book.model')

router.get(
  "/new",
  (req, res)=>{
  res.render("new-book")
})
// This is the twin routes way that we saw on the express routes lesson
/* router.route("/new")
.get((req, res)=>{
  res.render("new-book")
})
.post((req, res)=>{
  // Create entity here
}) */

// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************
router.get(
  "/:id",
  (req, res)=>{
    Book.findById(req.params.id).
    then((book)=>{
      res.render("book-details", book)
    })
  })

// The HTML insterface does not allow the delete verb to be sent in a request
/*
router.delete("/:id", (req, res)=>{
  res.send(`Deleted book ${req.params.id}`)
})
*/

router.get("/:id/delete",(req, res)=>{
  Book.findByIdAndDelete(req.params.id)
  .then(deletedBook => res.redirect("/books"))
  .catch(error=> console.log(error))
})


// The HTML insterface does not allow the delete verb to be sent in a request
/*
router.put("/:id", (req, res)=>{
  res.send(`Edited book ${req.params.id}`)
})
*/

router.route("/:id/edit")
.get((req, res)=>{
  Book.findById(req.params.id)
  .then(book=>res.render("book-edit", book))
  
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
  
  router.get(
    '/',
    (req, res) => { // What URL does this answer?
      Book.find()
      .then(books => {
        res.render('books-list', {books})})
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
      