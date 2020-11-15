import React, { useState, useEffect } from "react"
import "./App.css"

function Shop() {
  useEffect(() => {
    fetchItems()
  }, [])

  const [items, setItems] = useState([])

  const fetchItems = async () => {
    const data = await fetch("https://swapi.dev/api/people/1")
    const items = await data.json()
    console.log(items)

    setItems(items.films)
  }

  return (
    <div>
      {items.map((item, i) => (
        <h1 key={i}>{item}</h1>
      ))}
    </div>
  )
}

export default Shop
