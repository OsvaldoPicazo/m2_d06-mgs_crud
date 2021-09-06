const express = require('express');
const router = express.Router();

/* GET home page */

// Code the  get('/') route here rendering index
router.all('/', (req, res) => {
  res.render('index', {title: "Home Page TEST"})
});

module.exports = router;
