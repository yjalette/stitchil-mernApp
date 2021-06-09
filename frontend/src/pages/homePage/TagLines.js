import React from 'react';

import { Jumbotron } from 'react-bootstrap';

const TagLines = ({ content }) => {
    console.log(content)
    return (
        <Jumbotron className="tag-lines flex-center" fluid>
            <h4 className="tag-lines__title gradient-text">{content}</h4>
        </Jumbotron>
    )
}

export default TagLines;