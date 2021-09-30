import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../../queries/productQueries'
import ShopFilter from '../../Components/ShopFilter/ShopFilter'

// interface shopProps {
//     category: string
// }

interface product {
    name: string,
    image: string,
    manufacturer: string,
    price: number

}


// render shop page
const ShopPage = () => {
    const { category } = useParams<{ category?: string }>();
    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        variables: {
            category
        }
    });

    const renderFoundProducts = () => {
        if (loading) console.log("loading")
        else if (error) console.log("error")
        else return data.getProducts.map((product: product) => {
            const { name, image, manufacturer, price } = product
            console.log(image)
            return <div key={name + image}>
                <img src={image} alt={name} />
            </div>
        })
    }

    return (
        <div id="shop-page">
            {ShopFilter()}
            <h1>Shop {category}</h1>
            {renderFoundProducts()}
        </div>
    )
}

export default ShopPage
