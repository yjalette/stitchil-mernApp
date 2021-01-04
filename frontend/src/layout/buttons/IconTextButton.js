import React from 'react'
import { Button } from 'react-bootstrap'

const IconTextButton = ({ onClick, btn_class, icon, title }) => (
    <Button variant="" onClick={onClick} className={`iconTextButton flex-center ${btn_class}`}>{title}
        <i className={`${icon} customIcon mx-2`} />
    </Button>
)

export default IconTextButton



