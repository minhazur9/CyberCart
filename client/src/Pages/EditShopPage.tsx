import React, { useState, ChangeEvent, } from 'react'
import { FormControl, Select, InputLabel, makeStyles, Theme, createStyles, TextField, MenuItem } from '@material-ui/core'
import shopCategories from '../data/shopCategories';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 600,
            spacing: 8
        },
        select: {
            maxWidth: 200
        },
        textField: {
            marginTop: 10,
            marginBottom: 10
        },
    }),
);

const EditShopPage = () => {

    const [category, setCategory] = useState("")
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")

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

    // renders form
    const renderForm = () => {
        return (
            <div className="edit-shop-form">
                <FormControl className={classes.formControl}>
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
                    <TextField
                        label="Name"
                        id="name-field"
                        className={classes.textField}
                        value={itemName}
                        onChange={handleNameChange}
                    >
                    </TextField>
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
