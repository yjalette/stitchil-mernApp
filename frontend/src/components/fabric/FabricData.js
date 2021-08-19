import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { FABRICS_QUERY } from './graphql/queries'

const FabricData = ({ ids, childComponent }) => {
    const [values, setValues] = useState({})
    const { data, updateQuery } = useQuery(FABRICS_QUERY, {
        variables: { ids },
        skip: !ids || ids.length === 0
    });

    useEffect(() => {
        if (data) setValues(data.fabrics)
    }, [data])

    // if (!data || !data.gig) return <div>loading ...</div>


    const result = childComponent(values)
    return result
}

export default FabricData
