import { gql } from '@apollo/client'

export const ADD_PRODUCT = gql`
    mutation($category: String!, $name: String!, $model: String!, $description: String!, $price: String!, $manufacturer: String!, $image: Upload! ) {
        addProduct(category: $category, name: $name, model: $model, descripion: $description, price: $price, manufacturer: $manufacturer, image: $image ) {
        model
        name
        price
        category
        description
        manufacturer
        }
    }
`

export const UPLOAD_FILE = gql`
    mutation($file: Upload!) {
        singleUpload(file: $file) {
            filename
            mimetype
            encoding
        }
    }
`