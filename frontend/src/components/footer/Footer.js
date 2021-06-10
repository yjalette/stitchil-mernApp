
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import './Footer.css'

const Footer = () => {
    return (
        <Navbar className="footer w-100" >
            <Container className="p-2 flex-center justify-content-end">
                <span className="footer__elem">&#169; 2020 Stitch</span>
            </Container>
        </Navbar>
    )
}

export default Footer
