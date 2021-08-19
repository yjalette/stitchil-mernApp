import { useQuery } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GigContext from '../../context/Gig-context'
import { GIG_QUERY } from './graphql/queries'

const GigData = ({ children }) => {
    const { itemId } = useParams()
    const [gig, setGig] = useState({})
    const { data, updateQuery, loading } = useQuery(GIG_QUERY, {
        variables: { itemId },
        skip: !itemId
    });

    useEffect(() => {
        if (data) setGig(data.gig)
    }, [data])

    if (loading || !data) return <div>loading ...</div>

    return (
        <GigContext.Provider value={{ gig, setGig, updateQuery }}>
            {children}
        </GigContext.Provider>
    )
}

export default GigData
