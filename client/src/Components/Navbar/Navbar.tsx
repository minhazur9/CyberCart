import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCart from '../../Styles/ShoppingCart.svg'
import Cart from '../../Styles/Cart.svg'
import { TextField } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    input: {
        background: "#FAFCFF !important",
        fontSize: 20
    }
}));

const Navbar = () => {
    const classes = useStyles()
    return (
        <>
            <div className="nav">
                <Link to="/" className="logo">
                    <h2>CyberCart</h2>
                    <img className="shopping-cart-logo" src={ShoppingCart} alt="shopping-cart" />
                </Link>
                <div className="shop-button">
                    <h2>Shop</h2>
                </div>
                <TextField className="search" variant="filled" color="primary" InputProps={{ className: classes.input }} />
                <Link to="/cart" className="cart-button">
                    <img className="cart" src={Cart} alt="cart" />
                </Link>
            </div>
            <div className="shop-menu">
                <div className="menu-foreground"></div>
            </div>
        </>
    )
}

export default Navbar
