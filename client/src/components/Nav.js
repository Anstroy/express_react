import React, { Component } from "react"
import "../App.css"
import { Link } from "react-router-dom"

function Nav() {
  const navStyle = {
    color: "white",
  }

  return (
    <nav>
      <h3>🔥 React + Express</h3>
      <ul className="nav-links">
        <Link to="/search" style={navStyle}>
          <li>Search</li>
        </Link>
        <Link to="/saved" style={navStyle}>
          <li>Saved</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
