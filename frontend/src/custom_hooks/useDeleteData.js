import React, { useReducer, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { reducer } from '../reducers/deleteReducer';
import LoadingSpinner from '../components/LoadingSpinner';
import { DELETE_GIG_MUTATION } from '../graphql/mutations';

const useDeleteData = (delete_type, onCompleted) => {
    const [state, dispatch] = useReducer(reducer, { MUTATION: DELETE_GIG_MUTATION });
    const { MUTATION } = state;
    const [deleteItem, { data, error, loading }] = useMutation(state.MUTATION, {
        onCompleted: data => data && onCompleted && onCompleted()
    });

    useEffect(() => {
        if (delete_type && MUTATION) dispatch({ type: delete_type.toUpperCase() });
    }, [delete_type, MUTATION])

    if (loading) return <LoadingSpinner />

    return {
        data,
        error,
        loading,
        deleteItem
    }
}

export default useDeleteData;
