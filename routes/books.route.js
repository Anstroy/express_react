const express = require("express")
const bookController = require("../controllers/books.controller")
const router = express.Router()

router.get("/", bookController.all_books)
router.post("/", bookController.create_book)
router.get("/:id", bookController.view_book)
router.delete("/:id", bookController.delete_book)

module.exports = router
