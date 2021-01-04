import React from 'react'
import { Button } from 'react-bootstrap'

const SubmitButton = ({ title, btn_class, onSubmit }) => <Button
    variant=""
    type="submit"
    className={`formButton submitButton ${btn_class}`}
    onSubmit={onSubmit}>{title}</Button>

SubmitButton.defaultProps = {
    title: "submit"
}

export default SubmitButton
