import React, { useReducer, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks';

import LoadingSpinner from '../components/LoadingSpinner';
import { reducer } from '../reducers/queryReducer';

const useGetData = (query, func) => {
    const [state, dispatch] = useReducer(reducer, {});
    const [getData, { data, loading, error, fetchMore, updateQuery }] = useLazyQuery(state.QUERY, {
        onCompleted: (data) => func && func(data)
    });

    useEffect(() => {
        if (query) dispatch({ type: query.toUpperCase() })
    }, [query]);

    console.log("fetch err--->", error)

    if (loading) return <LoadingSpinner />

    return {
        data,
        loading,
        error,
        updateQuery,
        getData
    }
}

export default useGetData
