import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";

const useHandleServerError = ({ error, history }) => {
    const [message, showMessage] = useState("");
    // console.log(error)
    useEffect(() => {
        if (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.map(err => {
                    console.log(err)
                    if (err.message === "token") {
                        return history.push('/logout')
                    }
                    else {
                        return showMessage(err.message)
                    }
                })
            } else {
                return history.push('/logout')
            }
        }
    }, [error])

    return message

}

export default withRouter(useHandleServerError) 
