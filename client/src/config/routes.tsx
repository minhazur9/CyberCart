import React from 'react'
import { Route, Switch } from 'react-router'
import EditShopPage from '../Pages/EditShopPage'
import HomePage from '../Pages/HomePage'
import ShopPage from '../Pages/ShopPage'

// The Pages
const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop/edit" component={EditShopPage} />
            <Route path="/shop" component={ShopPage} />
        </Switch>
    )
}

export default Routes
