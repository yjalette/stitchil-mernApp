import React from 'react';
import { Spinner, Container } from "react-bootstrap";

const LoadingSpinner = () => (
    <Container className="flex-center vh-100">
        <Spinner animation="border" role="status" size="lg" variant="primary" >
            <span className="sr-only">Loading...</span>
        </Spinner>
    </Container>
)

export default LoadingSpinner
