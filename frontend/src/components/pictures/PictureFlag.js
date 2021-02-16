import React from 'react';
import ReactCountryFlag from "react-country-flag";
import { getName, getCode } from 'country-list';
import "./style.css"

const PictureFlag = ({ countryCode, country }) => (
    <ReactCountryFlag
        className="flag-img"
        countryCode={countryCode || getCode(country) || ""}
        svg
        title={country || getName(countryCode) || ""}
    />
)

export default PictureFlag