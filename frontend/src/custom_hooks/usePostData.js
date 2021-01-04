import React, { useReducer, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import LoadingSpinner from '../components/LoadingSpinner';
import { reducer } from '../reducers/mutationReducer';
import { SIGNUP_MUTATION } from '../graphql/mutations';

const usePostData = (post_type, onCompleted) => {
    const [state, dispatch] = useReducer(reducer, { MUTATION: SIGNUP_MUTATION });
    const [post, { data, error, loading }] = useMutation(state.MUTATION, {
        onCompleted: (data) => data && onCompleted && onCompleted(data)
    });

    useEffect(() => {
        if (post_type && state.MUTATION) dispatch({ type: post_type.toUpperCase() });
    }, [post_type, state.MUTATION])

    if (loading) return <LoadingSpinner />

    return {
        data,
        error,
        loading,
        post
    }
}

export default usePostData;
