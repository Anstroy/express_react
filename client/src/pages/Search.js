import React, { useState, useEffect, Component } from "react"
import "../App.css"

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      books: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value)
    event.preventDefault()
  }

  fetchBooks = async () => {
    if (this.state.value.length > 0) {
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${
          this.state.value
        }&key=${"AIzaSyAYeIrbfE6DDlKyaoiBQQS2_IlW1fbz9vk"}`
      )
      const { items } = await data.json()
      console.log(items)

      this.setState({ books: items })
    } else {
      alert("Please type something")
    }
  }

  addBookToDB = async ({ volumeInfo: book }, id) => {
    const bookInfo = {
      authors: book.authors,
      description: book.description,
      image: book.imageLinks.thumbnail,
      link: book.previewLink,
      title: book.title,
    }

    console.log(bookInfo)

    await fetch(`${process.env.SERVER_URL || ""}/api/books`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(bookInfo), // body data type must match "Content-Type" header
    })
      .then((response) => {
        alert(`Book ${bookInfo.title} Added to the DB!`)

        this.setState({ books: this.state.books.filter((b) => b.id != id) })

        console.log(response.json())
      })
      .catch((err) => alert("something when wrong"))
  }

  render() {
    return (
      <div className="container mx-auto">
        <h1 className="text-5xl">Search</h1>
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="book-title"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Search by book title"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={this.fetchBooks}
        >
          Search
        </button>

        <div className="my-4 text-white font-bold">
          <ul>
            {this.state.books.map((item, i) => (
              <li
                className="bg-gray-600 rounded my-2 py-2 relative flex justify-center justify-between items-center"
                key={i}
              >
                <img src={item.volumeInfo.imageLinks.thumbnail} className="h-20 ml-5" />
                <div className="w-1/2">
                  <a
                    className="hover:text-gray-900 hover:underline font-bold text-2xl cursor-pointer"
                    href={item.volumeInfo.previewLink}
                  >
                    {item.volumeInfo.title}
                  </a>
                  <p className="text-xs text-black">{item.volumeInfo.description}</p>
                </div>
                <button
                  className="rounded shadow py-3 px-8 bg-blue-300 text-white font-bold hover:bg-blue-700 mr-5"
                  onClick={() => this.addBookToDB(item, item.id)}
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    )
  }
}

export default Search
