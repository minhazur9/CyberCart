import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import EditShopPage from '../Pages/EditShop/EditShopPage';

describe("EditShopPage", () => {
    describe("Edit Shop Form", () => {
        test("Edit shop form should be rendered", () => {
            render(<EditShopPage />)
            const editForm = screen.getByRole("form")
            expect(editForm).toBeVisible()
        })

        test("Name should be displayed when typed", () => {
            render(<EditShopPage />)
            const editName = screen.getByRole("textbox", { name: /Name/i }) as HTMLInputElement
            userEvent.type(editName, "IPhone11")
            expect(editName.value).toBe("IPhone11")
        })

        test("Description should be displayed when typed", () => {
            render(<EditShopPage />)
            const editDescription = screen.getByRole("textbox", { name: /Description/i }) as HTMLInputElement
            userEvent.type(editDescription, "It is a super expensive phone")
            expect(editDescription.value).toBe("It is a super expensive phone")
        })

        test("Model should be displayed when typed", () => {
            render(<EditShopPage />)
            const editModel = screen.getByRole("textbox", { name: /Model/i }) as HTMLInputElement
            userEvent.type(editModel, "DDS82023RE506RTGR0")
            expect(editModel.value).toBe("DDS82023RE506RTGR0")
        })
    })
})