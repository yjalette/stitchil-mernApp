import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import LoadingSpinner from '../components/LoadingSpinner';

const useMutationHook = (MUTATION, handleResponse) => {
    const [post, { data, error, loading }] = useMutation(MUTATION, {
        onCompleted: (data) => handleResponse && handleResponse(data)
    });

    if (loading) return <LoadingSpinner />

    console.log(error)

    return {
        data,
        error,
        loading,
        post
    }
}

export default useMutationHook;
