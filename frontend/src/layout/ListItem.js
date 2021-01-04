import React from 'react';
import { Container } from 'react-bootstrap';
import ShowMore from './ShowMore';


import './style.css'

const ListItem = ({ field, icon, content, maxWords }) => {

    return (
        <Container className={`listItem listItem-${field}`}>
            {icon ? <img src={icon} className="listItem__icon" alt="list icon" /> : <span className="listItem__field">{field}</span>}
            {maxWords && content.length > maxWords ?
                <ShowMore content={content} maxWords={maxWords} />
                :
                <span className="listItem__content">{content !== undefined && (Array.isArray(content) ? content.join(" ") : content)}</span>
            }
        </Container>
    )
}

export default ListItem
