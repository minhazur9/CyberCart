import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ShoppingCart from '../../Styles/ShoppingCart.svg'
import Cart from '../../Styles/Cart.svg'
import { TextField } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import shopCategories from '../../data/shopCategories'

const useStyles = makeStyles((theme) => ({
    input: {
        background: "#FAFCFF !important",
        fontSize: 20
    }
}));

// The Navbar component
const Navbar = () => {
    const [shopMenuVisible, setShopMenuVisible] = useState<Boolean>(false) // if the shop sub menu should be visible
    const [accountMenuVisble, setAccountMenuVisible] = useState<Boolean>(false) // if the account sub menu should be visible
    const [loggedIn, setLoggedIn] = useState<Boolean>(false) // check if you are logged in

    // use custom styles
    const classes = useStyles()

    // renders all shop categories
    const renderShopCategories = () => {
        return shopCategories.map((category, index) => {
            return (
                <div className="category">
                    <Link key={category + index} data-testid="category" to="/shop">{category}</Link>
                </div>
            )
        })
    }

    // renders account links
    const renderAccountLinks = () => {
        return (
            <>
                <div className="account-link">
                    <Link to="/account" >Account Information</Link>
                </div>
                <div className="account-link">
                    <Link to="/">Logout</Link>
                </div>
            </>
        )
    }

    // Renders sign in button
    const renderSignInButton = () => {
        return (
            <Link
                to="/login"
                className="sign-in-button nav-item"
                role="button"
                onClick={() => setLoggedIn(true)}>
                Sign In
            </Link>
        )
    }

    // Render account button
    const renderAccountButton = () => {
        return (
            <>
                <div
                    className="account-button"
                    data-testid="account-button"
                    onMouseOver={() => setAccountMenuVisible(true)}
                    onMouseOut={() => setAccountMenuVisible(false)}
                >
                    <h2 className="nav-item">minhazur9</h2>
                </div>
                <div
                    className="account-menu"
                    data-testid="account-menu"
                    style={{ display: accountMenuVisble ? "inline-grid" : "none" }}
                    onMouseOver={() => setAccountMenuVisible(true)}
                    onMouseOut={() => setAccountMenuVisible(false)}
                >
                    {renderAccountLinks()}
                </div>
            </>
        )
    }

    return (
        <>
            <div className="nav">
                <Link to="/" className="logo nav-item">
                    <h2>CyberCart</h2>
                    <img className="shopping-cart-logo nav-item" src={ShoppingCart} alt="shopping-cart" />
                </Link>
                <div
                    className="shop-button nav-item"
                    role="button"
                    onMouseOver={() => setShopMenuVisible(true)}
                    onMouseOut={() => setShopMenuVisible(false)}
                >
                    <h2>Shop</h2>
                </div>
                <TextField className="search" variant="filled" color="primary" InputProps={{ className: classes.input }} />
                {loggedIn ? renderAccountButton() : renderSignInButton()}
                <Link to="/cart" className="cart-button nav-item">
                    <img className="cart" src={Cart} alt="cart" />
                </Link>
            </div>
            <div
                className="shop-menu"
                style={{ display: shopMenuVisible ? "inline-block" : "none" }}
                data-testid="shop-menu"
                onMouseOver={() => setShopMenuVisible(true)}
                onMouseOut={() => setShopMenuVisible(false)}
            >
                <div className="category-list">
                    {renderShopCategories()}
                </div>

            </div>
        </>
    )
}

export default Navbar
