const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: "Author"}, //_id,
    rating: Number
  },
  {
    timestamp: true
  }
);

// const Book = model('Book', bookSchema);
// module.exports = Book;

module.exports = model('Book', bookSchema);
