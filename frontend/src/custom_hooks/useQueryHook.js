import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks';
import LoadingSpinner from '../components/LoadingSpinner';

const useQueryHook = (QUERY, variables, handleResponse) => {
    const { loading, error, data, refetch, fetchMore, updateQuery } = useQuery(QUERY, {
        variables,
        onCompleted: (data) => handleResponse && handleResponse(data)
    });

    if (loading) return <LoadingSpinner />

    return {
        data,
        loading,
        error,
        refetch,
        fetchMore,
        updateQuery
    }
}

export default useQueryHook
