import { Link } from 'react-router-dom'
import Product from '../../interfaces/Product'


const ProductListing = ({ product }: { product: Product }) => {
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
            <p>{`$${price}`}</p>
        </h2>
    </div>
}

export default ProductListing
