import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from '../Pages/HomePage'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
        </Switch>
    )
}

export default Routes
