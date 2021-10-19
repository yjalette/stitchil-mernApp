import React from 'react'
import ListingData from '../../components/listing/ListingData'
import PageWrapper from '../../layout/PageWrapper'
import GigDraftFormWrapper from './GigDraftFormWrapper'

const GigDraftPage = () => {
    return (
        <div>
            <PageWrapper>
                <ListingData>
                    <GigDraftFormWrapper />
                </ListingData>
            </PageWrapper>
        </div>
    )
}

export default GigDraftPage
