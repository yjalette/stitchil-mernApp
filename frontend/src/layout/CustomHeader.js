import React from 'react';
import { Jumbotron } from 'react-bootstrap'

const CustomHeader = ({ header_class, header_bg, title, subtitle }) => (
    <Jumbotron fluid className={`${header_class} ${header_bg} backgroundImg`}>
        <Container>
            {title && <h4 className="customHeader_title">{title}</h4>}
            {subtitle && <p className="customHeader_subtitle">{subtitle}</p>}
        </Container>
    </Jumbotron>
)

export default CustomHeader
