import { useState, ChangeEvent, } from 'react'
import { FormControl, Select, InputLabel, makeStyles, Theme, createStyles, TextField, MenuItem, Button } from '@material-ui/core'
import shopCategories from '../../data/shopCategories';
import { useMutation } from '@apollo/client';
import { ADD_PRODUCT } from '../../queries/productQueries';

const CurrencyTextField = require('@unicef/material-ui-currency-textfield').default

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 600,
            spacing: 8
        },
        select: {
            maxWidth: 250
        },
        textField: {
            marginTop: 10,
            marginBottom: 10
        },
        numberField: {
            marginTop: 10,
            maxWidth: 200
        },
        imageButton: {
            marginTop: 15,
            maxWidth: 200
        },
        button: {
            marginTop: 15,
        }

    }),
);

const ProductForm = () => {
    const [category, setCategory] = useState("") // item category
    const [model, setModel] = useState("") // model number
    const [name, setName] = useState("") // item name
    const [description, setDescription] = useState("") // item description
    const [manufacturer, setManufacturer] = useState("") // set item manufacturer
    const [price, setPrice] = useState("0.00") // item price
    const [image, setImage] = useState("") // item image
    const [quantity, setQuantity] = useState(0) // item quantity

    const [addProduct] = useMutation(ADD_PRODUCT, {
        onCompleted: () => {
            setCategory("")
            setModel("")
            setName("")
            setDescription("")
            setManufacturer("")
            setPrice("0.00")
            setImage("")
            setQuantity(0)
        }
    }

    )
    const classes = useStyles()

    // renders categories
    const renderCategories = () => {
        return shopCategories.map((category, index) => {
            const { displayName, value } = category
            return (
                <MenuItem key={`${displayName}${index}`} value={value} role="option" aria-label="category" data-testid="category" >{displayName}</MenuItem>
            )
        })
    }

    // handles category change
    const handleCategoryChange = (e: ChangeEvent<{ value: unknown }>) => {
        setCategory(e.target.value as string)
    }

    // handles item name change
    const handleNameChange = (e: ChangeEvent<{ value: unknown }>) => {
        setName(e.target.value as string)
    }

    // handles item description change
    const handleDescriptonChange = (e: ChangeEvent<{ value: unknown }>) => {
        setDescription(e.target.value as string)
    }

    // handles item price change
    const handlePriceChange = (e: ChangeEvent<{ value: unknown }>) => {
        setPrice(e.target.value as string)
    }

    // handles item manufacturer change
    const handleManufacturerChange = (e: ChangeEvent<{ value: unknown }>) => {
        setManufacturer(e.target.value as string)
    }

    // handles model change
    const handleModelChange = (e: ChangeEvent<{ value: unknown }>) => {
        setModel(e.target.value as string)
    }

    // handles item image change 
    const handleImageChange = (e: any) => {
        const image = e.target.files[0]
        setImage(image)
    }

    // handle item quantity change
    const handleQuantityChange = (e: ChangeEvent<{ value: unknown }>) => {
        const inputQuantity = Number(e.target.value)
        if (inputQuantity < 0) setQuantity(0)
        else setQuantity(inputQuantity)
    }

    // renders category select
    const renderEditCategory = () => {
        return (
            <>
                <InputLabel>Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    data-testid="category-select"
                    id="category-select"
                    value={category}
                    className={classes.select}
                    onChange={handleCategoryChange}
                >
                    {renderCategories()}
                </Select>
            </>
        )
    }

    // render model field
    const renderEditModel = () => {
        return (
            <TextField
                label="Model"
                id="model-field"
                className={classes.textField}
                value={model}
                onChange={handleModelChange}
            >
            </TextField>
        )
    }

    // renders item name field
    const renderEditName = () => {
        return (
            <TextField
                label="Name"
                id="name-field"
                className={classes.textField}
                value={name}
                onChange={handleNameChange}
            >
            </TextField>
        )
    }

    // renders item description field 
    const renderEditDescription = () => {
        return (
            <TextField
                label="Description"
                id="description-field"
                multiline
                variant="outlined"
                minRows={10}
                className={classes.textField}
                value={description}
                onChange={handleDescriptonChange}
            >
            </TextField>
        )
    }

    // renders item quantity field
    const renderEditQuantity = () => {
        return (
            <TextField
                label="Quantity"
                id="quantity-field"
                type="number"
                className={classes.numberField}
                value={quantity}
                onChange={handleQuantityChange}
            >
            </TextField>
        )
    }

    // render item manufacturer field
    const renderEditCompany = () => {
        return (
            <TextField
                label="Manufacturer"
                id="manufacurer-field"
                className={classes.textField}
                value={manufacturer}
                onChange={handleManufacturerChange}
            >
            </TextField>
        )
    }

    // renders image upload button
    const renderEditImage = () => {
        return (
            <Button
                variant="contained"
                className={classes.imageButton}
                color="primary"
                component="label"
            >
                Upload Image
                <input
                    type="file"
                    hidden accept=".png, .jpg"
                    onChange={handleImageChange}
                />
            </Button>
        )
    }

    // renders the price field
    const renderEditPrice = () => {
        return (
            <CurrencyTextField
                label="Price"
                variant="outlined"
                currencySymbol="$"
                outputFormat="number"
                minimumValue="0"
                decimalCharacter="."
                digitGroupSeparator=","
                className={classes.numberField}
                value={price}
                onBlur={handlePriceChange}
            />
        )
    }

    // Handle new product submit form
    const submitForm = () => {
        addProduct({
            variables: {
                model,
                name,
                price: price.replace(/,/g, ""),
                category,
                description,
                manufacturer,
                image,
                quantity
            }
        })
    }

    const renderForm = () => {
        return (
            <div className="edit-shop-form">
                <FormControl className={classes.formControl} role="form" >
                    {renderEditCategory()}
                    {renderEditModel()}
                    {renderEditName()}
                    {renderEditDescription()}
                    {renderEditQuantity()}
                    {renderEditCompany()}
                    {renderEditPrice()}
                    {renderEditImage()}
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => submitForm()}
                    >
                        Add Item
                    </Button>
                </FormControl>
            </div>
        )
    }

    return (
        <>
            {renderForm()}
        </>
    )

}

export default ProductForm
