import React from 'react'
import { useParams } from 'react-router'
import ShopFilter from '../Components/ShopFilter/ShopFilter'

interface shopProps {
    category: string
}

const ShopPage = () => {
    const { category } = useParams<shopProps>()
    return (
        <div id="shop-page">
            {ShopFilter()}
            <h1>Shop {category}</h1>
        </div>
    )
}

export default ShopPage
