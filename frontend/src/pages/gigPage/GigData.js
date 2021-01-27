import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useQueryHook from '../../custom_hooks/useQueryHook';
import GigGrid from './GigGrid';
import { VIEW_GIG_QUERY } from './graphql/queries';

const GigData = () => {
    const { id } = useParams()
    const { data } = useQueryHook(VIEW_GIG_QUERY, { id });
    const [values, setValues] = useState({});

    useEffect(() => {
        if (data) setValues(data.view_gig)
    }, [data])

    if (!data) return <div>loaddd</div>

    return <GigGrid gig={values} />
}

export default GigData
