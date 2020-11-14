const mongoose = require("mongoose")
const Schema = mongoose.Schema

// The Schema is like the mold where the model will base off
const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: [{ type: String }],
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Book = mongoose.model("Book", BookSchema) // singular so it will match plural on DB

module.exports = Book
