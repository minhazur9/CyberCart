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
    const [menuVisibility, setMenuVisibility] = useState<Boolean>(false) // if the shop sub menu should be visible

    // use custom styles
    const classes = useStyles()

    // renders all shop categories
    const renderShopCategories = () => {
        return shopCategories.map((category, index) => {
            return (
                <Link key={category + index} data-testid="category" className="category" to="/shop">{category}</Link>
            )
        })
    }

    return (
        <>
            <div className="nav">
                <Link to="/" className="logo">
                    <h2>CyberCart</h2>
                    <img className="shopping-cart-logo" src={ShoppingCart} alt="shopping-cart" />
                </Link>
                <div className="shop-button"
                    onMouseOver={() => setMenuVisibility(true)}
                    onMouseOut={() => setMenuVisibility(false)}
                >
                    <h2>Shop</h2>
                </div>
                <TextField className="search" variant="filled" color="primary" InputProps={{ className: classes.input }} />
                <Link to="/cart" className="cart-button">
                    <img className="cart" src={Cart} alt="cart" />
                </Link>
            </div>
            <div className="shop-menu"
                style={{ display: menuVisibility ? "inline-block" : "none" }}
                data-testid="shop-menu"
                onMouseOver={() => setMenuVisibility(true)}
                onMouseOut={() => setMenuVisibility(false)}
            >
                <div className="category-list">
                    {renderShopCategories()}
                </div>

            </div>
        </>
    )
}

export default Navbar
