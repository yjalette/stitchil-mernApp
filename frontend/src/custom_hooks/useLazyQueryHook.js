import React, { useReducer, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks';
import LoadingSpinner from '../components/LoadingSpinner';

const useLazyQueryHook = (QUERY, handleResponse) => {
    const [getData, { data, loading, error, fetchMore, updateQuery }] = useLazyQuery(QUERY, {
        onCompleted: (data) => handleResponse && handleResponse(data)
    });

    if (loading) return <LoadingSpinner />

    return {
        data,
        loading,
        error,
        fetchMore,
        updateQuery,
        getData
    }
}

export default useLazyQueryHook;
