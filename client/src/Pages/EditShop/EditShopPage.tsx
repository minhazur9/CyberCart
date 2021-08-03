import React, { useState, ChangeEvent, } from 'react'
import { FormControl, Select, InputLabel, makeStyles, Theme, createStyles, TextField, MenuItem } from '@material-ui/core'
import shopCategories from '../../data/shopCategories';
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
        }
    }),
);

const EditShopPage = () => {

    const [category, setCategory] = useState("") // item category
    const [itemName, setItemName] = useState("") // item name
    const [itemDescription, setItemDescription] = useState("") // item description
    const [itemPrice, setItemPrice] = useState("0.00") // item price

    const classes = useStyles()

    // renders categories
    const renderCategories = () => {
        return shopCategories.map((category, index) => {
            return (
                <MenuItem key={category + index} value={category}>{category}</MenuItem>
            )
        })
    }

    // handles category change
    const handleCategoryChange = (event: ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string)
    }

    // handles item name change
    const handleNameChange = (event: ChangeEvent<{ value: unknown }>) => {
        setItemName(event.target.value as string)
    }

    // handles item description change
    const handleDescriptonChange = (event: ChangeEvent<{ value: unknown }>) => {
        setItemDescription(event.target.value as string)
    }

    // handles item price change
    const handlePriceChange = (event: ChangeEvent<{ value: unknown }>) => {
        setItemPrice(event.target.value as string)
    }

    // renders category select
    const renderEditCategory = () => {
        return (
            <>
                <InputLabel>Category</InputLabel>
                <Select
                    labelId="category-select-label"
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

    // renders item name field
    const renderEditName = () => {
        return (
            <TextField
                label="Name"
                id="name-field"
                className={classes.textField}
                value={itemName}
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
                value={itemDescription}
                onChange={handleDescriptonChange}
            >
            </TextField>
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
                value={itemPrice}
                onBlur={handlePriceChange}
            />
        )
    }

    // renders form
    const renderForm = () => {
        return (
            <div className="edit-shop-form">
                <FormControl className={classes.formControl} role="form" >
                    {renderEditCategory()}
                    {renderEditName()}
                    {renderEditDescription()}
                    {renderEditPrice()}
                </FormControl>
            </div>
        )
    }

    return (
        <div id="edit-shop-page">
            <h1>Edit Shop Page</h1>
            {renderForm()}
        </div>
    )
}

export default EditShopPage
