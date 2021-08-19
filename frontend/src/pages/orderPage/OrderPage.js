import React from 'react'
import PageWrapper from '../../layout/PageWrapper'
import "./style.css"

const OrderPage = ({ children }) => {
    return (
        <PageWrapper mod_class="order">
            {children}
        </PageWrapper>
    )
}

export default OrderPage
