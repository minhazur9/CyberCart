import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../../queries/productQueries'
import ShopFilter from '../../Components/ShopFilter/ShopFilter'

interface product {
    name: string,
    image: string,
    manufacturer: string,
    price: number

}


// render shop page
const ShopPage = () => {
    const { category } = useParams<{ category: string }>();
    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        variables: {
            category
        }
    });

    // Renders all the products that are found by filters
    const renderFoundProducts = () => {
        if (loading) console.log("loading")
        else if (error) console.log("error")
        else return data.getProducts.map((product: product) => {
            const { name, image, manufacturer, price } = product
            return <div key={name + image} className="product-listing">
                <img src={image} alt={name} />
                <p>{manufacturer}</p>
                <p>{price}</p>
            </div>
        })
    }

    // Removes all hyphens and captializes the first letters of category for the title
    const formatCategory = (category: string) => {
        return category.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    }

    return (
        <div id="shop-page">
            {ShopFilter()}
            <h1>Shop {formatCategory(category)}</h1>
            {renderFoundProducts()}
        </div>
    )
}

export default ShopPage
