import React from 'react'
import { Button } from 'react-bootstrap'

const IconTextButton = ({ onClick, btn_class, icon, title }) => (
    <Button variant="" value={title} onClick={onClick} className={`iconTextButton flex-center ${btn_class}`}>
        <span className="iconTextButton__title">{title}</span>
        <i className={`${icon} iconTextButton__icon`} />
    </Button>
)

export default IconTextButton



