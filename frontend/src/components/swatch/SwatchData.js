import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { SWATCHES_QUERY } from './graphql/queries'

const SwatchData = ({ ids, childComponent }) => {
    const [values, setValues] = useState({})
    const { data, updateQuery } = useQuery(SWATCHES_QUERY, {
        variables: { ids },
        skip: !ids || ids.length === 0
    });

    useEffect(() => {
        if (data) setValues(data.swatches)
    }, [data])

    // if (!data || !data.gig) return <div>loading ...</div>

    console.log(data)
    const result = childComponent(values)
    return result
}

export default SwatchData
