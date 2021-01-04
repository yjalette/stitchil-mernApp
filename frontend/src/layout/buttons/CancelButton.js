import React from 'react'
import { Button } from 'react-bootstrap'

const CancelButton = ({ title, btn_class, onCancel }) => <Button
    variant=""
    className={`formButton cancelButton ${btn_class}`}
    onCancel={onCancel}>{title}</Button>

CancelButton.defaultProps = {
    title: "cancel"
}

export default CancelButton
