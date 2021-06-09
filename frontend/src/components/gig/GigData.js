import { useQuery } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { GIG_QUERY } from './graphql/queries'

const GigData = ({ compReceiver }) => {
    const { itemId } = useParams()
    const [values, setValues] = useState({})
    const { data, updateQuery } = useQuery(GIG_QUERY, {
        variables: { itemId },
        skip: !itemId
    });

    useEffect(() => {
        if (data) setValues(data.gig)
    }, [data])


    const result = compReceiver({ values, updateQuery })
    return result
}

export default GigData
