import React from 'react';
import ReactCountryFlag from "react-country-flag";
import "./style.css"

const PictureFlag = ({ countryCode }) => (
    <ReactCountryFlag
        className="flag-img"
        countryCode={countryCode || "US"}
        svg
        title="US"
    />
)

export default PictureFlag