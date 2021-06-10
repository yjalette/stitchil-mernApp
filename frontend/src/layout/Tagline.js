import React from 'react';
import { Jumbotron, Image } from 'react-bootstrap';

const Tagline = ({ title, subTitle, url, className }) => (
    <Jumbotron className={`tagline flex-center ${className}`} fluid>
        <div className="tagline__col ">
            {title && <h4 className="tagline__title gradient-text">{title}</h4>}
            {subTitle && <h4 className="tagline__subTitle gradient-text">{subTitle}</h4>}
        </div>
        {url && <Image src={url} className="tagline__img" />}
    </Jumbotron>
)

export default Tagline;