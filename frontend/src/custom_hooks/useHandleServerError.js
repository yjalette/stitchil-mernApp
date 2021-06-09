import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";

const useHandleServerError = (error) => {
    const [serverError, setServerError] = useState("");
    // console.log(error)
    useEffect(() => {
        if (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.map(err => {
                    return setServerError(err.message)
                })
            }
        }
    }, [error])

    return {
        serverError
    }

}

export default useHandleServerError;
