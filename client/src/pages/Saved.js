import React, { useState, useEffect } from "react"
import "../App.css"

function Saved() {
  useEffect(() => {
    fetchItems()
  }, [])

  const [books, setBooks] = useState([])

  const fetchItems = async () => {
    const data = await fetch("http://localhost:3001/api/books")
    const { books } = await data.json()
    console.log(books)

    setBooks(books)
  }

  const removeBookFromDB = async (book) => {
    if (window.confirm("Are you sure you want to remove this book from your list?") === true) {
      console.log("Removing Book from dB")

      await fetch(`http://localhost:3001/api/books/${book._id}`, {
        method: "DELETE",
      }).then(() => {
        setBooks(books.filter((b) => b._id !== book._id))
      })
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl">Saved</h1>
      <div className="my-4 text-white font-bold">
        <ul>
          {books.map((book, i) => (
            <li className="bg-gray-600 rounded my-2 py-4 relative" key={i}>
              {book.title}
              <button
                className="p-1 bg-red-600 text-white font-bold absolute right-0 hover:bg-red-900"
                onClick={() => removeBookFromDB(book)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Saved
