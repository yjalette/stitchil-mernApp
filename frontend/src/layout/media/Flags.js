import React from 'react';
import ReactCountryFlag from "react-country-flag"


const Flags = ({ countryCode }) => {
    return (
        <ReactCountryFlag
            className="flag"
            countryCode={countryCode || "US"}
            svg
            title="US"
        />
    )
}

export default Flags
