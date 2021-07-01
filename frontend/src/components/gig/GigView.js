import React from 'react'
import GigData from './GigData'
import GigGrid from './GigGrid'

const GigView = () => {
    return (
        <>
            <GigData
                compReceiver={({ values }) => <GigGrid item={values.item} />}
            />
        </>
    )
}

function getGigGrid({ item }) {

    return <GigGrid item={item} />
}

export default GigView
