const express = require('express');
const router = express.Router();

const Author = require('../models/Author.model');

// ****************************************************************************************
// GET route for displaying the new author page
// ****************************************************************************************

router.get(
    "/new",
    (req, res)=>{
    res.render("new-author")
  })

// ****************************************************************************************
// GET route for displaying the book details page
// ****************************************************************************************
router.get("/:id", (req, res) => {
    Author.findById(req.params.id)
      .then((author) => {
        res.render('author-details', author)
      })
  })

// ****************************************************************************************
// GET route for deleting a book
// ****************************************************************************************

router.get("/:id/delete",(req, res)=>{
    Author.findByIdAndDelete(req.params.id)
    .then(deletedAuthor => res.redirect("/authors"))
    .catch(error=> console.log(error))
  })

// ****************************************************************************************
// GET route for editing a book
// ****************************************************************************************

router.route("/:id/edit")
.get((req, res)=>{
    Author.findById(req.params.id)
  .then(author => res.render("author-edit", author))
  // {data} curly braces only needed when passing an array
})
.post((req, res)=>{
  const {name, surname, nationality, bio} = req.body
  Author.findByIdAndUpdate(
    req.params.id,
    {name, surname, nationality, bio}
  )
  .then(updateAuthor => res.redirect(`/authors/${req.params.id}`))
  .catch(error => console.log(error))
})

// ****************************************************************************************
// GET route for the base route
// ***************************************************************************************

// This is the base path of the DB entity
router.get('/', 
(req, res) => {
  Author.find()
  .then(authors => {
    res.render('authors-list', {authors})
    // since authors is an array, it mus be passed as an object with {}
  })
});

router.post(
    "/",
    (req, res)=>{
    const {name, surname, nationality, bio} = req.body
    Author.create({name, surname, nationality, bio})
    .then(newAuthor => res.redirect("/authors/"))
  })

  module.exports = router;