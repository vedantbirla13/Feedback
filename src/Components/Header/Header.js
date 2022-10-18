import React from 'react'
import "./Header.css"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <> 
      <div className='header'>
          <Link to="/" className='header-text'>Feedback</Link>

     
      </div>
    </>
  )
}

export default Header