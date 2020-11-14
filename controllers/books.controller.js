const Book = require("../models/Book")

const all_books = (req, res) => {
  Book.find()
    .lean()
    .sort({ createdAt: -1 })
    .then((result) => {
      console.log(result)
      res.json({ books: result })
    })
    .catch((err) => res.json(err))
}

const view_book = (req, res) => {
  Book.findById(req.params.id)
    .lean()
    .then((result) => {
      res.json({ book: result })
    })
    .catch((err) => res.status(404).res.json("404", { title: "Page not found!" }))
}

const create_book = (req, res) => {
  const book = new Book(req.body)
  book
    .save()
    .then((result) => {
      res.json(book)
    })
    .catch((err) => res.json(err))
}

const delete_book = (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({ message: `Book with ID ${req.params.id} DELETED!` })
    })
    .catch((err) => res.json(err))
}

module.exports = {
  all_books,
  view_book,
  create_book,
  delete_book,
}
