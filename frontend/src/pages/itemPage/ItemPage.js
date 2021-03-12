import React from 'react'
import PageWrapper from '../../layout/PageWrapper'
import ItemData from './ItemData'
import './style.css'

const ItemPage = ({ children }) => (
    <PageWrapper page_class="item">
        <ItemData />
        {children}
    </PageWrapper>
)

export default ItemPage
