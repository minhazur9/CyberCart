import React from 'react'
import ShoppingCart from '../Styles/ShoppingCart.svg'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="nav">
            <Link to="/" className="logo">
                <h2>CyberCart</h2>
                <img className="shopping-cart-logo" src={ShoppingCart} alt="shopping-cart" />
            </Link>
        </div>
    )
}

export default Navbar
