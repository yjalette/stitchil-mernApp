import React from 'react'

const VerLine = ({ text }) => (
    <div className="vl-wrapper flex-center">
        <hr className="vl vl-left" />
        <span>{text}</span>
        <hr className="vl vl-right" />
    </div>
)

export default VerLine
