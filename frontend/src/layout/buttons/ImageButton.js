import React from 'react';
import { Container, Image } from 'react-bootstrap';

const ImageButton = ({ title, imageUrl, onClick, btn_class }) => (
    <Container className={`${btn_class} imageButton flex-center flex-column`}>
        <Image className="imageButton__img" src={imageUrl} onClick={onClick} />
        <span className="label">{title}</span>
    </Container>
)

export default ImageButton
