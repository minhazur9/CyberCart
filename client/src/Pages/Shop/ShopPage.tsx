import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../../queries/productQueries'
import { Link } from 'react-router-dom'
import ShopFilter from '../../Components/ShopFilter/ShopFilter'

interface product {
    name: string,
    image: string,
    manufacturer: string,
    price: number,
    model: string,

}

// render shop page
const ShopPage = () => {
    const { category } = useParams<{ category: string }>();
    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        variables: { category },
        pollInterval: 60000,
    });

    // Renders all the products that are found by filters
    const renderFoundProducts = () => {
        if (loading) console.log("loading")
        else if (error) console.log("error")
        else return data.getProducts.map((product: product) => {
            const { name, image, manufacturer, price, model } = product
            return <div key={name + image} className="product-listing">
                <Link to={`/product/${model}`}>
                    <img src={image} alt={name} onError={() => console.log("Forbidden")} />
                </Link>
                <div className="product-listing-info">
                    <Link to={`/product/${model}`}>{name}</Link>
                    <p>{manufacturer}</p>
                </div>
                <h2 className="product-price">
                    <p>${price}</p>
                </h2>


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
            <div className="show-products">
                <h1>Shop {formatCategory(category)}</h1>
                {renderFoundProducts()}
            </div>

        </div>
    )
}

export default ShopPage
