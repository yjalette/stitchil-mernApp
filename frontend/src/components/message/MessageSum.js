import React from 'react'
import { Container } from 'react-bootstrap'

const MessageSum = ({ onClick, count, children, comp_class }) => {
    return (
        <Container className={`${comp_class} messageSum`}>
            {children}
            <span className="messageSum__label label" onClick={onClick}><i className="fa fa-comments mr-1" /> {count || 0}</span>
        </Container>
    )
}

export default MessageSum
