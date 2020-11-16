import React, { Component } from "react"
import "./App.css"
import Nav from "./components/Nav"
import Search from "./pages/Search"
import Saved from "./pages/Saved"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Footer from "./components/Footer"

function App() {
  const style = {
    "min-height": "100vh",
  }

  return (
    <Router>
      <div className="App relative" style={style}>
        <Nav />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/saved" component={Saved} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
)

export default App
