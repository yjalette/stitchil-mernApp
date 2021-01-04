import React from 'react';

const Header = ({ header_image, text }) => {
    return (
        <div className="header">
            <div className="backgroundImg" style={{ backgroundImage: `url(${header_image})`, height: "400px" }}>  </div>
            <h1 className="position-center">{text}</h1>
        </div>
    )
}

export default Header
