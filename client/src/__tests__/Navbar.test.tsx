import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

const MockNavbar = () => {
    return (
        <Router>
            <Navbar />
        </Router>
    )
}

describe("Navbar", () => {
    describe("Shop Menu", () => {
        test("shop sub menu should not be showing initially", () => {
            render(<MockNavbar />)
            const shopMenu = screen.getByTestId("shop-menu")
            expect(shopMenu).not.toBeVisible()
        })

        test("shop sub menu should render all the categories", () => {
            render(<MockNavbar />)
            const categories = screen.getAllByTestId("category")
            expect(categories.length).toBe(16)
        })
    })

})