import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const RedirectAlert = ({ duration, url, func, heading, text, className }) => {
    const { push } = useHistory();

    useEffect(() => {
        const timeout = setTimeout(() => {
            func && func();
            push(url);
        }, duration);
        return () => clearTimeout(timeout);
    }, [])

    return (
        <Alert className={`${className} redirectAlert`} variant="">
            {heading && <Alert.Heading className="redirectAlert__heading">{heading}</Alert.Heading>}
            <p className="redirectAlert__text">{text}</p>
        </Alert>
    )
}

export default RedirectAlert