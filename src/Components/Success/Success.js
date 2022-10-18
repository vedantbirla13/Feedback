import React from 'react'
import "./Success.css"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const Success = () => {
  return (
    <div className='success'>
        <main>
            <div className="success-details">
                <span className='success-icon'><BsFillCheckCircleFill/></span>
                <h1 className='success-text'>Thank you for providing the feedback </h1>
                <p className='success-para'>We will work towards improving your experience</p>
                <Link to="/">
                    <button className='success-button'>Close</button>
                </Link>
            </div>
        </main>
    </div>
  )
}

export default Success