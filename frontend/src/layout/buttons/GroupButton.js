import React from 'react'
import { Container } from 'react-bootstrap'

const GroupButton = ({ children, group_class }) => (
    <Container className={`groupButton ${group_class}`}>
        {children}
    </Container>
)

export default GroupButton
