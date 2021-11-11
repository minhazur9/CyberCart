import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../../queries/productQueries'
import ShopFilter from '../../Components/Shop/ShopFilter'
import Product from '../../interfaces/Product'
import ProductListing from '../../Components/Shop/ProductListing'


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
        else return data.getProducts.map((product: Product) => {
            return <ProductListing product={product} />
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
