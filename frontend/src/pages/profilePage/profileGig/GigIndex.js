import React from 'react'
import { PROFILE_GIGS_QUERY } from '../graphql/queries'
import ItemData from '../profileItems/ItemData'

const GigIndex = () => {

    return <ItemData query={PROFILE_GIGS_QUERY} />
}

export default GigIndex
