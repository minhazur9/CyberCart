import React from 'react'
import { Route, Switch } from 'react-router'
import EditShopPage from '../Pages/EditShop/EditShopPage'
import HomePage from '../Pages/Home/HomePage'
import ShopPage from '../Pages/Shop/ShopPage'

// The Pages
const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop/edit" component={EditShopPage} />
            <Route path="/shop/:category" component={ShopPage} />
        </Switch>
    )
}

export default Routes
