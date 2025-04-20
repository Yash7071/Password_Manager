import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx"
import Manager from "./components/Manager.jsx"
import Footer from './components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Manager />
      <Footer />
    </>
  )
}

export default App
