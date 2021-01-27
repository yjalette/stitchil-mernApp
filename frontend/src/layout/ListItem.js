import React from 'react';
import { Container } from 'react-bootstrap';
import ShowMore from './ShowMore';
import './style.css'

const ListItem = ({ field, icon, imageUrl, content, maxWords }) => console.log(maxWords) || (
    <Container className={`listItem listItem-${field}`}>
        {field && <span className="listItem__field">{field}</span>}
        {icon && <i className={`${icon} listItem__icon`} alt="list icon" />}

        {imageUrl && <img src={imageUrl} className="listItem__icon" alt="list img" />}
        {maxWords && content && content.length > maxWords ?
            <ShowMore content={content} maxWords={maxWords} />
            :
            <span className="listItem__content">{content !== undefined && (Array.isArray(content) ? content.join(" ") : content)}</span>
        }
    </Container>
)

export default ListItem
