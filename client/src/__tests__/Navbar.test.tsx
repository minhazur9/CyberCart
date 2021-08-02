import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from '../Components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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

        test("shop sub menu should render on mouse over on 'shop'", () => {
            render(<MockNavbar />)
            const shopButton = screen.getByRole("button", { name: /Shop/i })
            const shopMenu = screen.getByTestId("shop-menu")
            fireEvent.mouseOver(shopButton)
            expect(shopMenu).toBeVisible()
        })

        test("shop sub menu should stop continue to display even when it goes away from 'shop' and on to menu", () => {
            render(<MockNavbar />)
            const shopButton = screen.getByRole("button", { name: /Shop/i })
            const shopMenu = screen.getByTestId("shop-menu")
            fireEvent.mouseOver(shopButton)
            fireEvent.mouseOut(shopButton)
            fireEvent.mouseOver(shopMenu)
            expect(shopMenu).toBeVisible()
        })

        test("shop sub menu should stop displaying when it goes away from 'shop'", () => {
            render(<MockNavbar />)
            const shopButton = screen.getByRole("button", { name: /Shop/i })
            const shopMenu = screen.getByTestId("shop-menu")
            fireEvent.mouseOver(shopButton)
            fireEvent.mouseOut(shopButton)
            expect(shopMenu).not.toBeVisible()
        })

        test("shop sub menu should stop displaying when it goes away from the sub menu", () => {
            render(<MockNavbar />)
            const shopButton = screen.getByRole("button", { name: /Shop/i })
            const shopMenu = screen.getByTestId("shop-menu")
            fireEvent.mouseOver(shopButton)
            fireEvent.mouseOut(shopButton)
            fireEvent.mouseOver(shopMenu)
            fireEvent.mouseOut(shopMenu)
            expect(shopMenu).not.toBeVisible()
        })

        test("shop sub menu should render all the categories", () => {
            render(<MockNavbar />)
            const categories = screen.getAllByTestId("category")
            expect(categories.length).toBe(16)
        })

        test("shop sub menu should stop displaying after clicking on a category", () => {
            render(<MockNavbar />)
            const shopButton = screen.getByRole("button", { name: /Shop/i })
            const shopMenu = screen.getByTestId("shop-menu")
            const categories = screen.getAllByTestId("category")
            fireEvent.mouseOver(shopButton)
            userEvent.click(categories[0])
            expect(shopMenu).not.toBeVisible()
        })
    })

    describe("Account Menu", () => {
        test("the account sub menu should be rendered on mouse over the username", () => {
            render(<MockNavbar />)
            const signIn = screen.getByRole("button", { name: /Sign\sIn/i })
            userEvent.click(signIn)
            const username = screen.getByTestId("account-button")
            fireEvent.mouseOver(username)
            const accountMenu = screen.getByTestId("account-menu")
            expect(accountMenu).toBeVisible()
        })

        test("the account sub menu should not be rendered on mouse over when not signed in", () => {
            render(<MockNavbar />)
            const signIn = screen.getByRole("button", { name: /Sign\sIn/i })
            fireEvent.mouseOver(signIn)
            const accountMenu = screen.queryByTestId("account-menu")
            expect(accountMenu).toBe(null)
        })

        test("the account sub menu should stop displaying when clicking on any button", () => {
            render(<MockNavbar />)
            const signIn = screen.getByRole("button", { name: /Sign\sIn/i })
            userEvent.click(signIn)
            const accountMenu = screen.getByTestId("account-menu")
            const accountLink = screen.getByText(/Account\sInformation/i)
            userEvent.click(accountLink)
            expect(accountMenu).not.toBeVisible()
        })

        test("the account sub menu should stop being rendered when logged off", () => {
            render(<MockNavbar />)
            const signIn = screen.getByRole("button", { name: /Sign\sIn/i })
            userEvent.click(signIn)
            const accountMenu = screen.getByTestId("account-menu")
            const accountLink = screen.getByText(/Logout/i)
            userEvent.click(accountLink)
            expect(accountMenu).not.toBeInTheDocument()
        })
    })

})