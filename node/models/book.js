const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 200
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  publishedAt: {
    type: Date,
    min: '1990-10-10'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Book = mongoose.model('Book', bookSchema)
export { Book, bookSchema }
