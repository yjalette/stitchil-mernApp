import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';

import GigGrid from './GigGrid';
import { VIEW_GIGS_ITEM_QUERY } from './graphql/queries';

const GigData = () => {
    const { id } = useParams()
    const { data } = useQuery(VIEW_GIGS_ITEM_QUERY, { variables: { id } });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) setValues(data.view_gigs_item)
    }, [data])

    if (!data) return <div>loaddd</div>

    return <GigGrid gig={values} />
}

export default GigData
