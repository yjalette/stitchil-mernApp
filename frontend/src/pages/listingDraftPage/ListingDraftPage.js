import React from 'react'
import ListingData from '../../components/listing/ListingData'
import PageWrapper from '../../layout/PageWrapper'

const ListingDraftPage = ({ children }) => {
    return (
        <PageWrapper>
            <ListingData>
                {children}
            </ListingData>
        </PageWrapper>
    )
}

export default ListingDraftPage
