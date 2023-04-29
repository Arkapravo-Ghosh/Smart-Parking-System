import React from 'react'
import "./NavBar.css"

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/logo.jpg" alt="logo" />
      </div>
      <div className="heading">
        Smart Parking System
      </div>
    </div>
  )
}
