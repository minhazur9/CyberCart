import React from 'react'
import { useLocation } from 'react-router'

interface shopProps {
    categoryName: string
}

const ShopPage = () => {
    const { categoryName } = useLocation<shopProps>().state
    console.log(categoryName)
    return (
        <div id="shop-page">
            <div className="shopping-filters">
                 
            </div>
            <h1>Shop {categoryName}</h1>
        </div>
    )
}

export default ShopPage
