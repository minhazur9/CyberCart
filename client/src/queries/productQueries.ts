import { gql } from '@apollo/client'

export const ADD_PRODUCT = gql`
    mutation($category: String!, $name: String!, $model: String!, $description: String!, $price: String!, $manufacturer: String!, $image: Upload!, $quantity: Int! ) {
        addProduct(category: $category, name: $name, model: $model, description: $description, price: $price, manufacturer: $manufacturer, image: $image, quantity: $quantity ) {
        model
        name
        price
        category
        description
        manufacturer
        image
        quantity
        }
    }
`

export const GET_PRODUCTS = gql`
    query($category: String!) {
        getProducts(category: $category) {
            name
            price
            manufacturer
            image
            model
        }
    }
`