import React from 'react'

const Form_error = ({ title, content }) => {
    return (
        <div>
            <span className="form_error danger">{content.toLowerCase()}</span>
        </div>
    )
}

export default Form_error
